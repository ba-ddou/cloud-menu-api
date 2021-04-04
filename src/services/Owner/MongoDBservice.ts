import { OwnerDocument, OwnerCreate, OwnerEntity } from '../../entities/Owner'
import OwnerModel from '../../models/Owner'
import { hashNSalt } from '../../helpers/pswdEncryption'
export default class MongoDBService {

    async createOwner(owner: OwnerCreate) {
        // hash password
        // 
        let hashedPassword = await hashNSalt(owner.password);
        let NewOwner = {
            ...owner,
            hashedPassword
        };

        let ownerDocument = new OwnerModel(NewOwner);
        ownerDocument.save();
    }


}