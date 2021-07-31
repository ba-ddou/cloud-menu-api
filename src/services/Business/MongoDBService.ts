import { BusinessDocument } from '@cloudmenu/cloud-menu-shared-libs'
import BusinessModel from '../../models/Business'
export default class MongoDBService {
    async getBusiness(id: string): Promise<BusinessDocument | null> {
        let document = await BusinessModel.findById(id);
        if (document) return document;
    }
    async getAllBusinesses(): Promise<BusinessDocument[] | null> {
        let documents = await BusinessModel.find();
        if (documents && documents.length > 0) return documents;
    }
}