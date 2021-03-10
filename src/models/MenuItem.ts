import { Schema, Document, model } from 'mongoose';
import { MenuItemDocument } from '../types/MenuItem'



const MenuItemSchema = new Schema({
    name: String,
    price: Number,
    description: String,
    ingredients: String,
    thumbnail: {
        uri: String
    },
    section: String,
    establishment: {
        type: String,
        ref: 'Establishment'
    }
}, {
    collection: 'MenuItem'
});

interface MongooseMenuItemDocument extends Document, Omit<MenuItemDocument, '_id'> { }

const MenuItemModel = model<MongooseMenuItemDocument>('MenuItem', MenuItemSchema);

export default MenuItemModel;