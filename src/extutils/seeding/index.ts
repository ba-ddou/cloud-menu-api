import { Seeder } from 'mongo-seeding';
import * as path from 'path';
import { config } from 'dotenv'
config();

async function run() {
    const seeder = new Seeder({
        database: process.env.ATLAS_DB,
        // dropDatabase: true,
        dropCollections: true,
    });
    const collections = seeder.readCollectionsFromPath(
        path.resolve(__dirname, './collections'),
    );
    seeder
        .import(collections)
        .then(() => console.log('Done importing collections'));
}

run();