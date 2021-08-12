
import * as mongoose from 'mongoose'
import { config } from 'dotenv'
config();
const {
    LOCAL_DB,
    ATLAS_DB,
    USE_LOCAL_DB
} = process.env;




const dbURL = JSON.parse(USE_LOCAL_DB || 'false') ? LOCAL_DB : ATLAS_DB;

console.log({
    LOCAL_DB,
    ATLAS_DB,
    USE_LOCAL_DB,
    dbURL
});

export async function connect() {
    mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true});
}