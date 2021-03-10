import { EstablishmentDocument } from '../../types/Establishment'
import EstablishmentModel from '../../models/Establishment'
export default class MongoDBService {
    async getEstablishment(id: string): Promise<EstablishmentDocument | null> {
        let document = await EstablishmentModel.findById(id);
        if (document) return document;
    }
}