import { gql } from 'apollo-server'
import { MenuSection, MenuSectionDocument } from './MenuSection'
import { MenuItemDocument } from './MenuItem'
import { MongoDBMenuItemService } from '../services/MenuItem'

export type EstablishmentDocument = {
	_id: string
	name: string
	_type: string
	description?: string
	banner: {
		uri: string
	}
	thumbnail: {
		uri: string
	}
	logo?: {
		uri: string
	}
	email?: string
	phone?: string
	city: string
	address: string
	location?: {
		latitude: number
		longitude: number
	}
	sections: {
		id: string
		name: string
	}[]
	username?: string
	passwordHash?: string

}

export const Establishment = gql`
	type Image{
		uri: String
	}
	type Section{
		id: String
		name: String
	}
    type Establishment{
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

export const EstablishmentResolvers = {
	Establishment: {
		menu: async (parent: EstablishmentDocument) => {
			let menuItems: MenuItemDocument[] = await MongoDBMenuItemService.getEstablishmentMenuItems(parent._id);
			let menu: MenuSectionDocument[] = parent.sections.map(section => ({
				id: section.id,
				name: section.name,
				items: menuItems.filter(item => item.section == section.id)
			}))
			return menu;
		}
	}
}