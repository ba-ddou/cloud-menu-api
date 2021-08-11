import { gql } from 'apollo-server'
import { MenuSection, MenuSectionDocument } from './MenuSection'
import { MenuItem as MenuItemDocument } from '@cloudmenu/cloud-menu-shared-libs'
import { MongoDBMenuItemService } from '../services/MenuItem'
import { Owner as OwnerDocument } from '@cloudmenu/cloud-menu-shared-libs'



export const Owner = gql`

    type Owner{
		id: String
        name: String
        email: String
        phone: String
        businesses: [String]
}
`

