export interface rawBusinessData {
    img: {
        path: string
    }
    name: string
    categories: string[]
    preparationTime: number
    rating: number
    totalRated: number
    address: string
    openingHour: string // 10:00
    closingHour: string //21:30
    location: { lat: string, lng: string }
    menu: Partial<rawMenuItemData>[]
}

export interface rawMenuItemData {
    name: string
    description: string
    price: number
    img: {
        path: string
    }
    section: string
}