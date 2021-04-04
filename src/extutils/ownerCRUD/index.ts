
import * as commandLineArgs from 'command-line-args'
import { Owner } from '@cloudmenu/cloud-menu-shared-libs'
import { OwnerCreate, OwnerEntity } from '../../entities/Owner'
import { readFile } from 'jsonfile'
import * as pify from 'pify';
import * as path from 'path';
import { MongoDBOwnerService } from '../../services/Owner'
import { connect } from '../../mongooseConnection'

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
    const owner: OwnerCreate = await pify(readFile)(path.resolve(__dirname, `../../../${src}.json`));
    if (owner) {
        console.log({ owner });
        let valid = OwnerEntity.assertCreatePayload(owner);
        if (valid) {
            MongoDBOwnerService.createOwner(owner);
        } else console.error('field are missing');

    }
}

connect();
run();