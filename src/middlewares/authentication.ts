import { verifyAuthToken } from '../helpers/jwtToken'

export default function (req: any, res: any, next: () => void) {
    const authToken: string | undefined = req.cookies?.authToken;
    if (authToken) {
        let payload = verifyAuthToken(authToken);
        if (payload.id)
            req.user = {
                ...payload,
                role: 'owner'
            }
        else req.user = { role: 'guest' };
    } else {
        req.user = { role: 'guest' };
    }


    next();

}