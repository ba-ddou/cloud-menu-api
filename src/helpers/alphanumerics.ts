const randomstring = require('randomstring');

export const getRandomAlphanumeric = (length: number) => () => {
    return randomstring.generate({
        length,
        charset: 'alphanumeric',
        readable: true,
        capitalization: 'uppercase'
    }) as number
}