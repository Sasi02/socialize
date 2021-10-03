import { Response, NextFunction } from 'express';

import { MetadataKeys } from './../config/meta.config';
import { AuthTypes } from './../constant/auth.constant';
import { RequestType } from './../constant/request.constant';
import { IRequest } from './../model/request.model';

export function AuthProvider(target: object, methodName: string | symbol, requestType: RequestType){
    return (request: IRequest, response: Response, next: NextFunction) => {
        const authParm: AuthTypes[] = Reflect.getOwnMetadata(MetadataKeys.auth, target, methodName) || null;

        if (authParm && authParm[0] === AuthTypes.noAuth) {
            next();
            return;
        }

        if (!request.config.user) {
            response.status(401).send('Authentication Error');
            return;
        }

        if (authParm && authParm[0] === AuthTypes.onlyAuth) {
            next();
            return;
        }

        if (target.constructor.prototype.location == null) {
            next();
        } else {
            response.status(403).send('Access UnAuthorised');
            return;
        }
    }
}