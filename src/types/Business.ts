import { gql } from 'apollo-server'
import { MenuSection, MenuSectionDocument } from './MenuSection'
import { MenuItem as MenuItemDocument } from '@cloudmenu/cloud-menu-shared-libs'
import { MongoDBMenuItemService } from '../services/MenuItem'
import { BusinessDocument } from '@cloudmenu/cloud-menu-shared-libs'



export const Business = gql`
	type Image{
		uri: String
	}
	input ImageInput {
		uri: String
	}
	type Section{
		id: String
		name: String
	}
	input SectionInput {
		businessId: String
		name: String
	}
    type Business{
		_id: String
		name: String
		_type: String
		description: String
		banner: Image
		thumbnail: Image
		logo: Image
        email: String
		phone: String
		city: String
		address: String
        sections: [Section]
        menu: [MenuSection]
}
`

export const BusinessResolvers = {
	Business: {
		menu: async (parent: BusinessDocument) => {
			let menuItems: MenuItemDocument[] = await MongoDBMenuItemService.getBusinessMenuItems(parent._id);
			let menu: MenuSectionDocument[] = parent.sections.map(section => ({
				id: section.id,
				name: section.name,
				items: menuItems.filter(item => item.section == section.id)
			}))
			return menu;
		}
	}
}