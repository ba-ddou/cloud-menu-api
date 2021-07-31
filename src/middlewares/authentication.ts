import { verifyAuthToken } from '../helpers/jwtToken'

export default function (token: string): {
    role: string | 'unknown',
} {
    let payload = verifyAuthToken(token);
    console.log("🚀 ~ file: authentication.ts ~ line 8 ~ payload", payload);
    return {
        role: 'owner'
    }

}