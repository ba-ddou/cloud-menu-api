import { MenuItemDocument } from '../../types/MenuItem'
import MenuItemModel from '../../models/MenuItem'
export default class MongoDBService {
    getMenuItem(id: string) {
        return {}
    }

    async getEstablishmentMenuItems(establishment: string): Promise<MenuItemDocument[]> {
        let documents = await MenuItemModel.find({
            establishment
        });
        if (documents) return documents;
    }
}