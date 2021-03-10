import { gql } from 'apollo-server'
import { MenuItemDocument } from './MenuItem'

export type MenuSectionDocument = {
    id: string
    name: string
    items: MenuItemDocument[]
}


export const MenuSection = gql`
    type MenuSection{
        id: String
        name: String
        items: [MenuItem]
    }
`
