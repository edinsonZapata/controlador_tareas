import { NextFunction, Request, Response } from 'express';
import {ACCESS_POLICY} from 'nodetypes_tareas';

/**
 * @description
 */
export const AccessPolicy = (role: ACCESS_POLICY) => {
    return function(req: Request, res: Response, next: NextFunction) {

        if (res.locals.user && res.locals.user.role && role === res.locals.user.role) next();

        else if(res.locals.user && res.locals.user.role && role !== res.locals.user.rol && role === ACCESS_POLICY.ALL) next();
        
        else return res.status(401).json({message: 'The given user doesnt have enough permissiones to do the operation'})
      }
}