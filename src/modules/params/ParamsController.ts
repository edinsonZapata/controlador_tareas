import { Controller, Get } from 'componente-base';
import { Request, Response, NextFunction } from 'express'
import { JWT } from 'componente-base';
import {ParamsService} from './ParamsService';

/**
 * @description
 * @export
 * @class ParamsController
 */
@Controller('/params', [JWT])
export class ParamsController {

    private paramsService: ParamsService;

    /**
     * Creates an instance of ParamsController.
     */
    constructor(){
        this.paramsService = new ParamsService();
    }

    /**
     * @description
     * @param {Request} request
     * @param {Response} response
     * @param {NextFunction} next
     */
    // @Get('/:type')
    // async getParams(request: Request, response: Response, next: NextFunction){
    //     try {
    //         /**
    //          * descripción 
    //          * @type {*}
    //          */
    //         const { type } = request.params
    //         /**
    //          * descripción 
    //          * @type {*}
    //          */
    //         const params = await this.paramsService.getParams(type);
    //         response.json({params: params.params}) 
    //     } catch (error) {
    //         next()
    //     }
    // }

    /**
     * @description
     * @param {Request} request
     * @param {Response} response
     * @param {NextFunction} next
     */
    // @Get('/recaptcha')
    // async getRecaptchaWebsiteKey(request: Request, response: Response, next: NextFunction){
    //     try {
    //         /**
    //          * descripción 
    //          * @type {*}
    //          */
    //         const params = await this.paramsService.getParams('RECAPTCHA_PARAMS');
    //         if(!params){
    //             response.status(400).json({error: "No recaptcha params"})
    //             return
    //         }
    //         /**
    //          * descripción 
    //          * @type {*}
    //          */
    //         const websiteKey = params.params[0].websiteKey;
    //         response.json({websiteKey}) 
    //     } catch (error) {
    //         next()
    //     }
    // }
}