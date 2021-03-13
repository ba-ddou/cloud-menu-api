import { Seeder } from 'mongo-seeding';
import * as path from 'path';


async function run() {
    const seeder = new Seeder({
        database: 'mongodb://localhost:27017/cloudMenuDb',
        dropDatabase: true,
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