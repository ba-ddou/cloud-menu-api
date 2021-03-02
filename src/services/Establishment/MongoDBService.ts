import { EstablishmentDocument } from '../../types/Establishment'
export default class MongoDBService {
    getEstablishment(id: string): Promise<EstablishmentDocument | null> {
        return null
    }
}