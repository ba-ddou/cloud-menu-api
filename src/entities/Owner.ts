import { Owner } from '@cloudmenu/cloud-menu-shared-libs'

export interface OwnerDocument extends Omit<Owner, 'id'> {
    _id: string
    hashedPassword: string
}

export interface OwnerCreate extends Omit<Owner, '_id' | 'businesses'> {
    password: string
}

export interface OwnerUpdate extends Partial<Omit<Owner, '_id'>> { }

export class OwnerEntity implements Omit<Owner, '_id'> {
    id: string;
    name: string;
    email: string;
    phone: string;
    businesses: string[];
    constructor({
        _id,
        name,
        email,
        phone,
        businesses
    }:OwnerDocument) {
        this.id = _id;
        this.name = name;
        this.email = email;
        this.businesses = businesses;
    }

}