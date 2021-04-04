
import * as jwt from 'jsonwebtoken'

export function getAuthToken(payload: {
    id: string
}) {
    var token = jwt.sign(payload, 'PRIVATE_KEY');
    return token;
}
