import { MenuItemDocument } from '../../types/MenuItem'
import MenuItemModel from '../../models/MenuItem'
export default class MongoDBService {
    getMenuItem(id: string) {
        return {}
    }

    async getEstablishmentMenuItems(establishmentId: string): Promise<MenuItemDocument[]> {
        let documents = await MenuItemModel.find({
            establishmentId
        });
        if (documents) return documents;
    }
}