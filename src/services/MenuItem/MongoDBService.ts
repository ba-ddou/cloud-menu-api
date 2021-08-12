import { MenuItem as MenuItemDocument } from '@cloudmenu/cloud-menu-shared-libs'
import MenuItemModel from '../../models/MenuItem'
export default class MongoDBService {
    getMenuItem(id: string) {
        return {}
    }

    async createMenuItem(menuItem: MenuItemDocument): Promise<{
        document: MenuItemDocument,
        error: string
    }> {
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