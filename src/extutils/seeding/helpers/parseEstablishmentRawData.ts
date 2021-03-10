import { EstablishmentDocument } from '../../../types/Establishment'
import { MenuItemDocument } from '../../../types/MenuItem'
import { rawEstablishmentData, rawMenuItemData } from '../data/types'
import { getAlphanumeric } from '../helpers/alphanumeric'


const alphanumeric = getAlphanumeric(8);

export const parseEstablishmentRawData = (data: rawEstablishmentData, city: string): [EstablishmentDocument, MenuItemDocument[]] => {
    let sectionNames: string[] = getDistinctMenuSections(data.menu);
    let sections = sectionNames.map(section => ({
        id: alphanumeric(),
        name: section
    }));
    let establishmentId = alphanumeric();
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
            establishment: establishmentId
        }));

    return [
        {
            _id: establishmentId,
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
            username: establishmentId,
            passwordHash: establishmentId
        },
        menu
    ]

}


function getDistinctMenuSections(menu: Partial<rawMenuItemData>[]): string[] {

    return menu.map((meal: any) => meal.section).filter((value, index, self) => self.indexOf(value) === index);

}