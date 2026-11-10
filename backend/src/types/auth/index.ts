import {Request} from 'express';
import User from '../../models/user.model';
import AuthToken from '../../models/auth-token.model';

export type TRequestWithUser = Request & {
    user?: User;
}

export type TRequestWithUserAndToken = TRequestWithUser & {
    authToken?: AuthToken;
}