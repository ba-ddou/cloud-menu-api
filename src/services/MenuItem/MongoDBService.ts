import { MenuItem as MenuItemDocument } from '@cloudmenu/cloud-menu-shared-libs'
import MenuItemModel from '../../models/MenuItem'
import { UserInputError, ValidationError } from 'apollo-server'
import { MongoDBBusinessService } from '../Business'
export default class MongoDBService {
    getMenuItem(id: string) {
        return {}
    }

    async createMenuItem(menuItem: MenuItemDocument): Promise<{
        document: MenuItemDocument,
        error: string
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
        ) throw new ValidationError('Invalid menu item shape');
        await MongoDBBusinessService.assertBusinessAndSection(menuItem.business, menuItem.section);
        let document = await MenuItemModel.create(menuItem);


        //@ts-ignore
        return { document, error: null };
    }

    async getBusinessMenuItems(business: string): Promise<MenuItemDocument[]> {
        let documents = await MenuItemModel.find({
            business
        });
        //@ts-ignore
        if (documents) return documents;
    }
}