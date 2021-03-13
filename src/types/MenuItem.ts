import { gql } from 'apollo-server'


export const MenuItem = gql`
    type MenuItem{
        name: String
        price: Float
        description: String
        ingredients: String
        thumbnail: Image
        section: String
        business: String
    }
`