import { BusinessDocument } from '@cloudmenu/cloud-menu-shared-libs'
import BusinessModel from '../../models/Business'
export default class MongoDBService {
    async getBusiness(id: string): Promise<BusinessDocument | null> {
        let document = await BusinessModel.findById(id);
        if (document) return document;
    }
    async getBusinesses(ids: string[]): Promise<BusinessDocument[] | null> {
        let documents = await BusinessModel.find({ _id: { $in: ids } });
        if (documents && documents.length > 0) return documents;
        else return documents.map(document => document.toObject());
    }
    async getAllBusinesses(): Promise<BusinessDocument[] | null> {
        let documents = await BusinessModel.find();
        if (documents && documents.length > 0) return documents;
    }
}