// import {ParamsService} from '../params/ParamsService';
import {
    Agent, 
    AgentDocument, 
    UserDocument, 
    UserRole,
    User
} from "nodetypes_tareas";

/**
 * @description
 * @export
 * @class AgentService
 */
export class AgentService {

    // private paramsService: ParamsService;

    // /**
    //  * Creates an instance of AgentService.
    //  */
    // constructor(){
    //     this.paramsService = new ParamsService();
    // }
    /**
     * @description
     * @param {UserDocument} user
     * @param {string[]} projects
     * @returns {*}  {Promise<AgentDocument>}
     */
     async createAgent(user: UserDocument, projects: string[]): Promise<AgentDocument> {
        /**
         * descripción 
         * @type {*}
         */
        const agent = new Agent({user: user._id, projects});
        /**
         * descripción 
         * @type {*}
         */
        const agentSaved = await agent.save();
        user.role = UserRole.AGENT;
        await user.save();
        return agentSaved
    }
}