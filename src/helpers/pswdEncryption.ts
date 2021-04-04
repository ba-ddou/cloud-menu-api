
import * as bcrypt from 'bcrypt'
import * as pify from 'pify'


export async function hashNSalt(password: string): Promise<string> {
    let salt = await pify(bcrypt.genSalt)(10);
    let hash: string = await pify(bcrypt.hash)(password, salt);
    return hash;
}

export async function assertPassword(password: string, hash: string): Promise<boolean> {
    let res = await pify(bcrypt.compare)(password, hash);
    return res ? true : false;
}


