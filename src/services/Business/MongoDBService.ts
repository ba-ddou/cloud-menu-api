import { BusinessDocument } from '../../types/Business'
import BusinessModel from '../../models/Business'
export default class MongoDBService {
    async getBusiness(id: string): Promise<BusinessDocument | null> {
        let document = await BusinessModel.findById(id);
        if (document) return document;
    }
}