import { TasksService } from './TasksService';
import {Controller, Get, MakeBadRequest, Post, Put} from "componente-base";
import {NextFunction} from "express";
import { StatusTask, Task, TaskDocument } from 'nodetypes_tareas';
import {Request, Response} from 'express'


@Controller('/tasks')
export class TasksController {
    private tasksService: TasksService;

    /**
     * Creates an instance of UserController.
     */
    constructor() {
        this.tasksService = new TasksService()
    }

    @Post('/')
    async Create(request: Request, response: Response, next: NextFunction) {
        try {
            const {theme, description, priority, status, assessment, managers} = request.body

            if(!theme || !description || !priority || !status || !assessment || !managers) {
                return response.status(400).json(MakeBadRequest(`Invalid parameters`));
            }

            await this.tasksService.createTask(theme, description, priority, status, assessment, managers)
                .then(task => response.json(task))
                .catch(error => {
                    console.error("[USER CONTROLLER][ERROR]", error)
                    response.status(500).json(error)
                })
        } catch (error) {
            next(error)
        }
    }

    @Get('/consultAllTasks')
    async consultAllTasks(request: Request, response: Response, next: NextFunction) {
        try {
            await this.tasksService.consultAllTasks()
                .then(task => response.json(task))
                .catch(error => {
                    console.error("[USER CONTROLLER][ERROR]", error)
                    response.status(500).json(error)
                })
        } catch (error) {
            next(error)
        }
    }

    @Put('/:_id')
    async editTask(request: Request, response: Response, next: NextFunction) {
        try {

            const  { _id } = request.params;
            
            console.log(_id);

            const taskId = await Task.findById({ _id: _id });    

            const {theme, description, priority, status, assessment, managers} = request.body

            if(!theme || !description || !priority || !status || !assessment || !managers) {
                return response.status(400).json(MakeBadRequest(`Invalid parameters`));
            }

            
            // const updatedTask =
            // await Task.findOneAndUpdate({ _id: request.params.id }, request.body, { upsert: true, new: true, lean: true});


            // const taskId = await Task.findById( _id )

            console.log(taskId);

            // await this.tasksService.consultNameTask(_id)
            //     .then(task => response.json(task))
            //     .catch(error => {
            //        console.error("[USER CONTROLLER][ERROR]", error)
            //         response.status(500).json(error)
            //     })

            await this.tasksService.editTasks(_id, theme, description, priority, status, assessment, managers)
                .then(task => response.json(task))
                .catch(error => {
                    console.error("[USER CONTROLLER][ERROR]", error)
                    response.status(500).json(error)
                })

            // const updatedTask =
            // await Task.findOneAndUpdate({ _id: request.params.id }, request.body, { upsert: true, new: true, lean: true});

            // delete updatedTask.theme
            // response.json({ message: updatedTask })


        } catch (error) {
            next(error)
        }
    }

    @Get('/consultNameTask')
    async consultOneNameTask(request: Request, response: Response, next: NextFunction){
        try{

            const {id, theme} = request.body

            if(!id || !theme) {
                return response.status(400).json(MakeBadRequest(`Invalid parameters`));
            }

            await this.tasksService.consultNameTask(id)
                .then(task => response.status(200).json(task))
                .catch(error => {
                    console.error("[USER CONTROLLER][ERRO]", error);
                    response.status(500).json(error)
                })
        }catch(error){
            next(error)
        }
    }

    @Get('/consultAllRecord')
    async consultAllRecord(request: Request, response: Response, next: NextFunction) {
        try {    

            const  task: TaskDocument[]  = await Task.find( { status:  StatusTask.RESOLVED })

            //const status  = await Task.find( { status: StatusTask.RESOLVED} )

            console.log(task);

            // await this.tasksService.consultRecord(task)
            //     .then(task => response.status(200).json(task))
            //      .catch(error => {
            //          console.error("[USER CONTROLLER][ERRO]", error);
            //         response.status(500).json(error)
            //      })

                          
            // const {status} = request.body

            // if(!status) {
            //     return response.status(400).json(MakeBadRequest(`Invalid parameters`));
            // }

            // await this.tasksService.consultRecord(status)
            //     .then(task => response.status(200).json(task))
            //     .catch(error => {
            //         console.error("[USER CONTROLLER][ERRO]", error);
            // response.status(500).json(error)
            //     })

                

        } catch (error) {
            next(error)
        }
    }

}