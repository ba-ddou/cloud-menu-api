import * as randomstring from 'randomstring'

export const getAlphanumeric = (length: number) => () => {
    return randomstring.generate({
        length,
        charset: 'alphanumeric',
        readable: true,
        capitalization: 'uppercase'
    });
}