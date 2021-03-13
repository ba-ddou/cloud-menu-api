import { BusinessDocument } from 'cloud-menu-shared-libs'
import { MenuItem as MenuItemDocument } from 'cloud-menu-shared-libs'
import { rawBusinessData, rawMenuItemData } from '../data/types'
import { getAlphanumeric } from '../helpers/alphanumeric'


const alphanumeric = getAlphanumeric(8);

export const parseBusinessRawData = (data: rawBusinessData, city: string): [BusinessDocument, MenuItemDocument[]] => {
    let sectionNames: string[] = getDistinctMenuSections(data.menu);
    let sections = sectionNames.map(section => ({
        id: alphanumeric(),
        name: section
    }));
    let businessId = alphanumeric();
    let menu: MenuItemDocument[] = data.menu.filter(menuItem => menuItem.price && menuItem.name)
        .map(menuItem => ({
            name: menuItem.name,
            price: menuItem.price,
            description: menuItem.description,
            ingredients: '',
            thumbnail: {
                uri: menuItem.img && menuItem.img.path ? menuItem.img.path : ''
            },
            section: sections.find((section) => section.name === menuItem.section).id,
            business: businessId
        }));

    return [
        {
            _id: businessId,
            _type: 'restaurant',
            address: data.address,
            banner: {
                uri: ''
            },
            city,
            name: data.name,
            sections,
            description: '',
            email: '',
            location: {
                latitude: parseFloat(data.location.lat),
                longitude: parseFloat(data.location.lng)
            },
            thumbnail: {
                uri: data.img && data.img.path ? data.img.path : ''
            },
            logo: {
                uri: ''
            },
            phone: '',
            username: businessId,
            passwordHash: businessId
        },
        menu
    ]

}


function getDistinctMenuSections(menu: Partial<rawMenuItemData>[]): string[] {

    return menu.map((meal: any) => meal.section).filter((value, index, self) => self.indexOf(value) === index);

}