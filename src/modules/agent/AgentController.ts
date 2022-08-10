import {Controller, Get, MakeBadRequest, Post, Put} from "componente-base";
import {Request, Response} from 'express'
import {NextFunction} from "express";
import {AgentService} from "./AgentService";
import {User, ACCESS_POLICY} from "nodetypes_tareas";
import {JWTMiddleware, AccessPolicy} from "../../utils";

@Controller('/agent')
export class AgentController {

    private agentService: AgentService;

    constructor() {
        this.agentService = new AgentService()
    }

    @Post('/:user', [AccessPolicy(ACCESS_POLICY.ADMIN)])
    async Create(request: Request, response: Response, next: NextFunction) {
        try {
            /**
             * descripción 
             * @type {*}
             */
            const {projects} = request.body;
            /**
             * descripción 
             * @type {*}
             */
            const user = await User.findById(request.params.user, '-password');
            if (!user) {
                return response.status(400).json(MakeBadRequest(`There is no user with this id`, {id: request.params.user}));
            }

           await this.agentService.createAgent(user, projects)
                .then(agent => response.json({agent}))
                .catch(error => {
                    console.log("[AGENT CONTROLLER][ERROR]", error)
                    response.status(500).json({code: 500, message: error, extra: []})
                })

        } catch (err) {
            next(err)
        }
    }

    @Get('/:id')
    async One(request: Request, response: Response, next: NextFunction) {
        try {
            console.log("estoy aca: ");
        } catch (err) {
            next(err)
        }
    }
}