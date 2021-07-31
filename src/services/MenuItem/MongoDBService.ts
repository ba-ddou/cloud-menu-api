import { MenuItem as MenuItemDocument } from '@cloudmenu/cloud-menu-shared-libs'
import MenuItemModel from '../../models/MenuItem'
export default class MongoDBService {
    getMenuItem(id: string) {
        return {}
    }

    async getBusinessMenuItems(business: string): Promise<MenuItemDocument[]> {
        let documents = await MenuItemModel.find({
            business
        });
        //@ts-ignore
        if (documents) return documents;
    }
}