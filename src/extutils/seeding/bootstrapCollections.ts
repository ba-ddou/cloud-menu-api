

import * as cities from './cities.json'
import { BusinessDocument } from '../../types/Business'
import { MenuItemDocument } from '../../types/MenuItem'
import { readFile, writeFile } from 'jsonfile'
import * as pify from 'pify';
import * as path from 'path';
import { parseBusinessRawData } from './helpers/parseBusinessRawData'
import { rawBusinessData } from './data/types'


async function run() {
    try {
        let businessesCollection: BusinessDocument[] = [];
        let menuItemsCollection: MenuItemDocument[] = [];
        for (let city of cities) {
            console.log(`processing ${city} ...`);
            const businessesData: rawBusinessData[] = await pify(readFile)(path.resolve(__dirname, `./data/${city}.json`));
            for (let business of businessesData) {
                console.log(`**processing ${business.name} ...`);
                const [businessesDocument, menuItemDocuments] = parseBusinessRawData(business, city);
                businessesCollection.push(businessesDocument);
                menuItemsCollection = [...menuItemsCollection, ...menuItemDocuments];
            }
            writeFile(path.resolve(__dirname, `./collections/Business/${city}_businesses.json`), businessesCollection);
            writeFile(path.resolve(__dirname, `./collections/MenuItem/${city}_menuItems.json`), menuItemsCollection);
        }

    } catch (error) {
        console.error(error);
    }
}

run();
