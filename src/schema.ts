import { Business, BusinessResolvers } from './types/Business';
import { BusinessDocument } from '@cloudmenu/cloud-menu-shared-libs'
import { MenuItem } from './types/MenuItem'
import { MenuSection } from './types/MenuSection'

import { gql } from 'apollo-server'
import { makeExecutableSchema } from 'graphql-tools'

import { MongoDBBusinessService } from './services/Business'
import { MongoDBOwnerService } from './services/Owner'


const Query = gql`
    type Query {
        business(id: String): Business
        businesses: [Business]
    }
    type Mutation {
        ownerLogin(email:String,password:String): String
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
        }
    },
    Mutation: {
        ownerLogin: async (_, args: {
            email: string,
            password: string
        }) => {
            let authToken = MongoDBOwnerService.login({
                email: args.email,
                password: args.password
            });
            return authToken;
        },
    }
}

export default makeExecutableSchema({
    typeDefs: [Query, Business, MenuItem, MenuSection],
    resolvers: {
        ...rootResolvers,
        ...BusinessResolvers
    }
})