import { gql } from 'apollo-server'
import { MenuSection, MenuSectionDocument } from './MenuSection'
import { MenuItem as MenuItemDocument } from '@cloudmenu/cloud-menu-shared-libs'
import { MongoDBBusinessService } from '../services/Business'
import { Owner as OwnerDocument, BusinessDocument } from '@cloudmenu/cloud-menu-shared-libs'
import { Business } from './Business'



export const Owner = gql`

    type Owner{
		id: String
        name: String
        email: String
        phone: String
        businesses: [Business]
}
`
export const OwnerResolvers = {
	Owner: {
    businesses: async (parent: OwnerDocument) => {
      let businesses: BusinessDocument[] = await MongoDBBusinessService.getBusinesses(parent.businesses);
      // console.log({businesses})
      return businesses;
    }
	}
}
