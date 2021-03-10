

import * as cities from './cities.json'
import { EstablishmentDocument } from '../../types/Establishment'
import { MenuItemDocument } from '../../types/MenuItem'
import { readFile, writeFile } from 'jsonfile'
import * as pify from 'pify';
import * as path from 'path';
import { parseEstablishmentRawData } from './helpers/parseEstablishmentRawData'
import { rawEstablishmentData } from './data/types'


async function run() {
    try {
        let establishmentsCollection: EstablishmentDocument[] = [];
        let menuItemsCollection: MenuItemDocument[] = [];
        for (let city of cities) {
            console.log(`processing ${city} ...`);
            const establishmentsData: rawEstablishmentData[] = await pify(readFile)(path.resolve(__dirname, `./data/${city}.json`));
            for (let establishment of establishmentsData) {
                console.log(`**processing ${establishment.name} ...`);
                const [establishmentsDocument, menuItemDocuments] = parseEstablishmentRawData(establishment, city);
                establishmentsCollection.push(establishmentsDocument);
                menuItemsCollection = [...menuItemsCollection, ...menuItemDocuments];
            }
            writeFile(path.resolve(__dirname, `./collections/Establishment/${city}_establishments.json`), establishmentsCollection);
            writeFile(path.resolve(__dirname, `./collections/MenuItem/${city}_menuItems.json`), establishmentsCollection);
        }

    } catch (error) {
        console.error(error);
    }
}

run();
