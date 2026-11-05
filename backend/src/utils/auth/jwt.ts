import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../constants';

export function generateJWT(uuid_user: string) {
    const payload = { uuid_user };
    return jwt.sign(payload, JWT_SECRET, {expiresIn: '8h'});
}
