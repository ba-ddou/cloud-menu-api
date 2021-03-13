import { Schema, Document, model } from 'mongoose';
import { BusinessDocument } from 'cloud-menu-shared-libs'

const sectionSchema = new Schema({
    id: {
        type: String,
    },
    name: String,
});

const BusinessSchema = new Schema({
    _id: {
        type: String
    },
    name: {
        type: String
    },
    _type: {
        type: String
    },
    description: {
        type: String
    },
    banner: {
        uri: String
    },
    thumbnail: {
        uri: String
    },
    logo: {
        uri: String
    },
    email: String,
    phone: String,
    city: String,
    address: String,
    location: {
        latitude: Number,
        longitude: Number
    },
    sections: [sectionSchema],
    username: String,
    passwordHash: String
    ,
}, {
    collection: 'Business'
});

interface MongooseBusinessDocument extends Document, Omit<BusinessDocument, '_id'> {
    _id: BusinessDocument['_id']
}

const BusinessModel = model<MongooseBusinessDocument>('Business', BusinessSchema);

export default BusinessModel;