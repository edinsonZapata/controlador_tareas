import {Controller, Get, MakeBadRequest, Post, Put} from "componente-base";
import {AgentService} from "./AgentService";

@Controller('/agent')
export class AgentController {

    private agentService: AgentService;

    constructor() {
        this.agentService = new AgentService()
    }
}