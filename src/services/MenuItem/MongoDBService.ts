import { MenuItemDocument } from '../../types/MenuItem'
import MenuItemModel from '../../models/MenuItem'
export default class MongoDBService {
    getMenuItem(id: string) {
        return {}
    }

    async getBusinessMenuItems(business: string): Promise<MenuItemDocument[]> {
        let documents = await MenuItemModel.find({
            business
        });
        if (documents) return documents;
    }
}