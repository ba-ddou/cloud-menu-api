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
import { allowFor, allowOnlyOwnBusinesses } from './middlewares/accessControl'
import { config } from 'dotenv'

config();

const {
    BRANCH_NAME,
    COMMIT_HASH,
    PIPELINE_ID,
    DEPLOYMENT_DATE,
} = process.env;

interface CloudMenuAPIContext extends ExpressContext {
    user?: {
        id: string,
        role: 'guest' | 'owner'
    }
}

const Query = gql`
    type APIMetaData {
        BRANCH_NAME: String
        COMMIT_HASH: String
        PIPELINE_ID: String
        DEPLOYMENT_DATE: String
    }
    type Query {
        business(id: String): Business
        businesses: [Business]
        ownerData: Owner
        apiMetaData: APIMetaData
    }
    type Mutation {
        ownerLogin(email:String,password:String): Owner
        createMenuItem(menuItem: MenuItemInput): MenuItem
        createSection(section: SectionInput): Section

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

        },
        apiMetaData: async (_, args, context: ExpressContext) => {
            return {
                BRANCH_NAME,
                COMMIT_HASH,
                PIPELINE_ID,
                DEPLOYMENT_DATE,
            }
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
            if (authToken) {
                context.res.setHeader('Set-Cookie', [`authToken=${authToken}`]);
                return owner;
            } else throw new UserInputError(error);


        },
        createMenuItem: async (_, args: { menuItem: MenuItemDocument }, context: CloudMenuAPIContext) => {
            let { menuItem } = args;
            await allowOnlyOwnBusinesses({
                role: context.user?.role,
                userId: context.user?.id,
                businessId: menuItem.business
            });
            console.log("🚀 ~ file: schema.ts ~ line 78 ~ createMenuItem: ~ menuItem", menuItem);
            let { error, document } = await MongoDBMenuItemService.createMenuItem(menuItem);
            return document
            // return menuItem;
        },
        createSection: async (_, args: { section: { businessId: string, name: string } }, context: CloudMenuAPIContext) => {
            let { section: { businessId, name } } = args;
            await allowOnlyOwnBusinesses({
                role: context.user?.role,
                userId: context.user?.id,
                businessId
            });
            let section = await MongoDBBusinessService.createSection(businessId, name);
            return section;
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