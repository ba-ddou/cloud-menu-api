import { Schema, Document, model } from 'mongoose';
import { OwnerDocument } from '../entities/Owner'
const OwnerSchema = new Schema({
    _id: {
        type: String
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    businesses: {
        type: [String],
        ref: 'Business'
    },
    username: {
        type: String
    },
    hashedPassword: {
        type: String
    }

}, {
    collection: 'Owner'
});

interface MongooseOwnerDocument extends Document, Omit<OwnerDocument, '_id'> {
    _id: OwnerDocument['_id']
}

const OwnerModel = model<MongooseOwnerDocument>('Owner', OwnerSchema);

export default OwnerModel;