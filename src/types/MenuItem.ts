import { gql } from 'apollo-server'

export type MenuItemDocument = {
    name: string
    price: number
    description: string
    ingredients: string
    thumbnail: {
        uri: string
    }
    section: string
    business: string
}


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