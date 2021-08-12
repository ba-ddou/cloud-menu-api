
import { ForbiddenError } from 'apollo-server'
import { MongoDBOwnerService } from '../services/Owner'

type UserRole = 'guest' | 'owner';

interface AccessControlContext {
    role?: UserRole,
    userId?: string,
    businessId?: string
}

export const allowFor = (context: AccessControlContext, roles: UserRole[]) => {
    let hasAccess = context.role && roles.includes(context.role);
    if (!hasAccess) throw new ForbiddenError('You don\'t access right to this query');
}

export const allowOnlyOwnBusinesses = async (context: AccessControlContext) => {
    if (context.role != 'owner') throw new ForbiddenError('You are not a business owner');
    if(context.businessId){
        let owner = await MongoDBOwnerService.getOwner(context.userId);
        if(owner.businesses && owner.businesses.includes(context.businessId)){
            return;
        } else {
            throw new ForbiddenError('You do not own this business');
        }
    }
    

}