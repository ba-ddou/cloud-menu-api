import { OwnerDocument, OwnerCreate, OwnerEntity } from '../../entities/Owner'
import OwnerModel from '../../models/Owner'
import { hashNSalt, assertPassword } from '../../helpers/pswdEncryption'
import { getAuthToken } from '../../helpers/jwtToken'
import { Owner } from '@cloudmenu/cloud-menu-shared-libs'

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

    // async getOwner(id: string) {
    //     return OwnerModel.findOne({
    //         _id: id
    //     });
    // }

    async login({
        email,
        password
    }: {
        email: string,
        password: string
    }): Promise<{
        authToken: string | null,
        owner: Owner | null,
        error: string | null
    }> {
        let owner = await OwnerModel.findOne({
            email
        });
        if (!owner) return {
            authToken: null,
            owner: null,
            error: 'owner not found'
        }
        let passwordIsCorrect = await assertPassword(password, owner.hashedPassword);
        if (passwordIsCorrect) {
            let authToken = getAuthToken({
                id: owner._id
            });
            return {
                authToken,
                //@ts-ignore
                owner,
                error: null
            };

        } else return {
            authToken: null,
            owner: null,
            error: 'password is incorrect'
        }


    }
}