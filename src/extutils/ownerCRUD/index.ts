
import * as commandLineArgs from 'command-line-args'
import { Owner } from '@cloudmenu/cloud-menu-shared-libs'
import { readFile } from 'jsonfile'
import * as pify from 'pify';
import * as path from 'path';

function parseCLIArgs(): {
    src: string,
    update: boolean
} {
    const optionDefinitions = [
        { name: 'src', alias: 'n', type: String },
        { name: 'update', alias: 'u', type: Boolean }
    ];
    var {
        src,
        update
    } = commandLineArgs(optionDefinitions);


    return {
        src,
        update: update ? true : false
    }
}



async function run() {
    let { src, update } = parseCLIArgs();
    if (!src) throw new Error('an owner documents source file is required');
    const owner: Omit<Owner, '_id' | 'username'> = await pify(readFile)(path.resolve(__dirname, `../../../${src}.json`));
    if (owner) console.log({ owner });
}
run();