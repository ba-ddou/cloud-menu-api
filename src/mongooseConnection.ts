
import * as mongoose from 'mongoose'
import { config } from 'dotenv'
config();
const {
    LOCAL_DB,
    ATLAS_DB
} = process.env;



export async function connect() {
    mongoose.connect(LOCAL_DB, {useNewUrlParser: true, useUnifiedTopology: true});
}