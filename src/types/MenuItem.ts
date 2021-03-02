import { gql } from 'apollo-server'

export type MenuItemDocument = {
    name: string
    price: string
    description: string
    ingredients: string
    thumbnail: {
        uri: string
    }
    sectionId: string
}


export const MenuItem = gql`
    type MenuItem{
        name: string
        price: string
        description: string
        ingredients: string
        thumbnail: {
            uri: string
        }
        sectionId: string
    }
`