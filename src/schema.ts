import { Business, BusinessResolvers } from './types/Business';
import { BusinessDocument, MenuItem as MenuItemDocument } from '@cloudmenu/cloud-menu-shared-libs'
import { MenuItem } from './types/MenuItem'
import { MenuSection } from './types/MenuSection'
import { Owner, OwnerResolvers } from './types/Owner'
import { gql, UserInputError, ForbiddenError } from 'apollo-server'
import { makeExecutableSchema } from 'graphql-tools'
import { ExpressContext } from 'apollo-server-express'

import { MongoDBBusinessService } from './services/Business'
import { MongoDBOwnerService } from './services/Owner'
import { MongoDBMenuItemService } from './services/MenuItem'
import { GenericHttpResponse } from './types/http'


const Query = gql`
    type Query {
        business(id: String): Business
        businesses: [Business]
        ownerData: Owner
    }
    type Mutation {
        ownerLogin(email:String,password:String): Owner
        createMenuItem(menuItem: MenuItemInput): MenuItem

    }
`

const rootResolvers = {
    Query: {
        business: async (_, args: {
            id: string
        }) => {
            let business = await MongoDBBusinessService.getBusiness(args.id);
            return business;
        },
        businesses: async () => {
            let businesses = await MongoDBBusinessService.getAllBusinesses();
            return businesses;
        },
        ownerData: async (_, args, context: ExpressContext) => {
            //@ts-ignore
            if (context.user?.role === 'owner') {
                //@ts-ignore
                let owner = await MongoDBOwnerService.getOwner(context.user?.id);
                return owner;
            } else throw new ForbiddenError('No owner is logged in');

        }
    },
    Mutation: {
        ownerLogin: async (_, args: {
            email: string,
            password: string
        }, context: ExpressContext) => {
            let { authToken, error, owner } = await MongoDBOwnerService.login({
                email: args.email,
                password: args.password
            });
            // let res: GenericHttpResponse<string>;
            if (authToken) {
                context.res.setHeader('Set-Cookie', [`authToken=${authToken}`]);
                // res = {
                //     status: 200,
                //     body: {
                //         error: null,
                //         data: 'login successful'
                //     }
                // }
                console.log({ owner });
                return owner;
            } else throw new UserInputError(error);


        },
        createMenuItem: async (_, args: { menuItem: MenuItemDocument }, context: ExpressContext) => {
            let { menuItem } = args;
            console.log("🚀 ~ file: schema.ts ~ line 78 ~ createMenuItem: ~ menuItem", menuItem);
            let { error, document } = await MongoDBMenuItemService.createMenuItem(menuItem);
            return document
            // return menuItem;
        }
    }
}

export default makeExecutableSchema({
    typeDefs: [Query, Business, MenuItem, MenuSection, Owner],
    resolvers: {
        ...rootResolvers,
        ...BusinessResolvers,
        ...OwnerResolvers
    }
})