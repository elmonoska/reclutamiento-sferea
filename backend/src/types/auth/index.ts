import {Request} from 'express';
import User from '../../models/User.model';
import AuthToken from '../../models/AuthToken';

export type TRequestWithUser = Request & {
    user?: User;
}

export type TRequestWithUserAndToken = TRequestWithUser & {
    authToken?: AuthToken;
}