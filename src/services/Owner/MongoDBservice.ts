import { OwnerDocument, OwnerCreate, OwnerEntity } from '../../entities/Owner'
import OwnerModel from '../../models/Owner'
import { hashNSalt, assertPassword } from '../../helpers/pswdEncryption'
import { getAuthToken } from '../../helpers/jwtToken'
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

    async login({
        email,
        password
    }: {
        email: string,
        password: string
    }): Promise<{
        authToken: string | null,
        error: string | null
    }> {
        let owner = await OwnerModel.findOne({
            email
        });
        if (!owner) return {
            authToken: null,
            error: 'owner not found'
        }
        let passwordIsCorrect = await assertPassword(password, owner.hashedPassword);
        if (passwordIsCorrect) {
            let authToken = getAuthToken({
                id: owner._id
            });
            return {
                authToken,
                error: null
            };

        } else return {
            authToken: null,
            error: 'password is incorrect'
        }


    }
}