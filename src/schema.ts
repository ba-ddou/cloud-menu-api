import { Establishment, EstablishmentResolvers, EstablishmentDocument } from './types/Establishment';
import { MenuItem } from './types/MenuItem'
import { MenuSection } from './types/MenuSection'

import { gql } from 'apollo-server'
import { makeExecutableSchema } from 'graphql-tools'

import { MongoDBEstablishmentService } from './services/Establishment'



const Query = gql`
    type Query {
        establishment(id: String): [Establishment]
    }
`

const rootResolvers = {
    Query: {
        establishment: async (_, args: {
            id: string
        }) => {
            let establishment = await MongoDBEstablishmentService.getEstablishment(args.id);
            return establishment;
        }
    }
}

export default makeExecutableSchema({
    typeDefs: [Query, Establishment, MenuItem, MenuSection],
    resolvers: {
        ...rootResolvers,
        ...EstablishmentResolvers
    }
})