import { OwnerDocument, OwnerCreate, OwnerEntity } from '../../entities/Owner'
import OwnerModel from '../../models/Owner'

export default class MongoDBService {

    createOwner(owner: OwnerCreate) {
        // hash password
        // 
        let ownerDocument = new OwnerModel(owner);
    }
    

}