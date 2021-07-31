import { Business, BusinessResolvers } from './types/Business';
import { BusinessDocument } from '@cloudmenu/cloud-menu-shared-libs'
import { MenuItem } from './types/MenuItem'
import { MenuSection } from './types/MenuSection'

import { gql } from 'apollo-server'
import { makeExecutableSchema } from 'graphql-tools'

import { MongoDBBusinessService } from './services/Business'



const Query = gql`
    type Query {
        business(id: String): Business
        businesses: [Business]
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
    }
}

export default makeExecutableSchema({
    typeDefs: [Query, Business, MenuItem, MenuSection],
    resolvers: {
        ...rootResolvers,
        ...BusinessResolvers
    }
})