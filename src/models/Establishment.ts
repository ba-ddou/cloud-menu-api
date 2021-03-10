import { Schema, Document, model } from 'mongoose';
import { EstablishmentDocument } from '../types/Establishment'

const sectionSchema = new Schema({
    id: {
        type: String,
    },
    name: String,
});

const EstablishmentSchema = new Schema({
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
    collection: 'Establishment'
});

interface MongooseEstablishmentDocument extends Document, Omit<EstablishmentDocument, '_id'> {
    _id: EstablishmentDocument['_id']
}

const EstablishmentModel = model<MongooseEstablishmentDocument>('Establishment', EstablishmentSchema);

export default EstablishmentModel;