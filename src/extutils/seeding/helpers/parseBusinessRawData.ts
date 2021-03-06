import { BusinessDocument } from '@cloudmenu/cloud-menu-shared-libs'
import { MenuItem as MenuItemDocument } from '@cloudmenu/cloud-menu-shared-libs'
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
    //@ts-ignore
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
                uri: data.img.path
            },
            city,
            name: data.name,
            sections,
            description: 'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression',
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
            //@ts-ignore
            username: businessId,
            passwordHash: businessId
        },
        menu
    ]

}


function getDistinctMenuSections(menu: Partial<rawMenuItemData>[]): string[] {

    return menu.map((meal: any) => meal.section).filter((value, index, self) => self.indexOf(value) === index);

}