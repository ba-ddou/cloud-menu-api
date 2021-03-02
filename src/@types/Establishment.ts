import { gql } from 'apollo-server'
import { MenuSection } from './MenuSection'
import { MenuItem } from './MenuItem'
import { MongoDBMenuItemService } from '../services/MenuItem'

type EstablishmentDocument = {
	id: string
	name: string
	_type: string
	description?: string
	banner: {
		uri: string
	}
	thumbnail: {
		uri: string
	}
	logo: {
		uri: string
	}
	email: string
	phone: string
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
	username: string
	passwordHash: string

}

export const Establishment = gql`
    type Establishment{
		id: string
		name: string
		_type: string
		description: string
		banner:{
			uri: string
		}
		thumbnail:{
			uri: string
		}
		logo:{
			uri: string
		}
        email: string
		phone: string
		city: string
		address: string
        sections: {
				id: string
				name: string
		}[]
        menu: MenuSection[]
}
`

export const EstablishmentResolvers = {
	Establishment: {
		menu: async (parent: EstablishmentDocument) => {
			let menuItems: MenuItem[] = await MongoDBMenuItemService.getEstablishmentMenuItems(parent.id);
			let menu: MenuSection[] = parent.sections.map(section => ({
				...section,
				items: menuItems.filter(item => item.sectionId == section.id)
			}))
			return menu;
		}
	}
}