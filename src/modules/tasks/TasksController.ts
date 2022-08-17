import { TasksService } from './TasksService';
import {Controller, Get, MakeBadRequest, Post, Put} from "componente-base";
import {NextFunction} from "express";
import {Request, Response} from 'express'

import { Task } from 'nodetypes_tareas';

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

    @Put('/:id')
    async editTask(request: Request, response: Response, next: NextFunction) {
        try {
            const {theme, description, priority, status, assessment, managers} = request.body

            if(!theme || !description || !priority || !status || !assessment || !managers) {
                return response.status(400).json(MakeBadRequest(`Invalid parameters`));
            }

           /*const editTask = await Task.findOneAndUpdate({_id: request.params._id}, request.body, { upsert: true, new: true, lean: true});
           response.json({message: editTask})
            await this.tasksService.editTasks(theme, description, priority, status, assessment, managers)
                .then(task => response.json(task))
                .catch(error => {
                    console.error("[USER CONTROLLER][ERROR]", error)
                    response.status(500).json(error)
                })*/ 
                
                const task = await Task.findByIdAndUpdate({managers:managers},{theme,description,priority,status,assessment})
                response.json(task)
        } catch (error) {
            next(error)
        }
    }
}