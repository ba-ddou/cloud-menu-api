import { Schema, Document, model } from 'mongoose';
import { MenuItem as MenuItemDocument } from 'cloud-menu-shared-libs'



const MenuItemSchema = new Schema({
    name: String,
    price: Number,
    description: String,
    ingredients: String,
    thumbnail: {
        uri: String
    },
    section: String,
    business: {
        type: String,
        ref: 'Business'
    }
}, {
    collection: 'MenuItem'
});

interface MongooseMenuItemDocument extends Document, Omit<MenuItemDocument, '_id'> { }

const MenuItemModel = model<MongooseMenuItemDocument>('MenuItem', MenuItemSchema);

export default MenuItemModel;