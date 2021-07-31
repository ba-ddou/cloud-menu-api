
import * as jwt from 'jsonwebtoken'

const JWT_PRIVATE_KEY = 'PRIVATE_KEY';

export function getAuthToken(payload: {
    id: string
}) {
    var token = jwt.sign(payload, JWT_PRIVATE_KEY);
    return token;
}

export function verifyAuthToken(token: string): {
    id: string | null
} {
    try {
        var payload = jwt.verify(token, JWT_PRIVATE_KEY);
        return payload;
    } catch (e) {
        return {
            id: null
        };
    }
}
