import {
	MenuItem as MenuItemDocument,
	MenuItemStatus,
} from "@cloudmenu/cloud-menu-shared-libs";
import MenuItemModel from "../../models/MenuItem";
import { UserInputError, ValidationError } from "apollo-server";
import { MongoDBBusinessService } from "../Business";
export default class MongoDBService {
	async getMenuItem(id: string): Promise<{
		document: MenuItemDocument | null;
		error: string;
	}> {
		if (!id)
			throw new UserInputError(`There\'s no menu item with id of ${id}`);
		try {
			let menuItem = await MenuItemModel.findById(id);
			return { document: menuItem as MenuItemDocument, error: null };
		} catch (e: any) {
			throw new UserInputError(
				`Something went wrong while reading the menu item with id of ${id}`
			);
		}
	}

	async createMenuItem(menuItem: MenuItemDocument): Promise<{
		document: MenuItemDocument;
		error: string;
	}> {
		// TODO: Implement cleaner input payload validation
		if (
			!menuItem.name ||
			!menuItem.thumbnail ||
			!menuItem.thumbnail.uri ||
			!menuItem.description ||
			!menuItem.price ||
			!menuItem.section ||
			!menuItem.business
		)
			throw new ValidationError("Invalid menu item shape");
		await MongoDBBusinessService.assertBusinessAndSection(
			menuItem.business,
			menuItem.section
		);
		let document = await MenuItemModel.create({
			...menuItem,
			status: "active",
			inStock: true,
		});

		//@ts-ignore
		return { document, error: null };
	}

	async updateMenuItem(
		id: string,
		menuItemUpdates: MenuItemDocument
	): Promise<{
		updatedDocument: MenuItemDocument;
		error: string;
	}> {
		if (!id)
			throw new UserInputError(`There\'s no menu item with id of ${id}`);
		if (
			menuItemUpdates.status &&
			// TODO:  use the MenuItemStatus enum (enum seem to not be supported in my current dev env)
			!["active","suspended","deleted"].includes(menuItemUpdates.status)
		)
			throw new UserInputError(`${menuItemUpdates.status} is an unvalid menu item status`);
		try {
			let updatedDocument = await MenuItemModel.findByIdAndUpdate(
				id,
				menuItemUpdates,
				{ new: true }
			).exec();

			return {
				updatedDocument: updatedDocument as MenuItemDocument,
				error: null,
			};
		} catch (error) {
			throw new Error(
				`Something went wrong while updating the menu item with id of ${id}`
			);
		}
	}

	async getBusinessMenuItems(business: string): Promise<MenuItemDocument[]> {
		let documents = await MenuItemModel.find({
			business,
		});
		//@ts-ignore
		if (documents) return documents;
	}
}
