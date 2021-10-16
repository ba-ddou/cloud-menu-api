import { gql } from 'apollo-server'


export const MenuItem = gql`
	type MenuItem {
		_id: String
		name: String
		price: Float
		description: String
		ingredients: String
		thumbnail: Image
		section: String
		business: String
		inStock: String
	}
	input MenuItemInput {
		name: String
		price: Float
		description: String
		ingredients: String
		thumbnail: ImageInput
		section: String
		business: String
	}
	input MenuItemUpdateInput {
		name: String
		price: Float
		description: String
		ingredients: String
		thumbnail: ImageInput
		section: String
		status: String
	}
`;