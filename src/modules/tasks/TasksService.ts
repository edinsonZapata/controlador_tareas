import { Task, StatusTask, TaskDocument } from "nodetypes_tareas";

export class TasksService {
    async createTask(
        theme: string, description: string, priority: string, status: StatusTask, 
        assessment: string, managers: string
    ) :Promise<TaskDocument> {

        const taskSaved = await new Task({theme, description, priority, status, assessment, managers}).save();

        return taskSaved
    }

    async consultAllTasks() {
        const tasks = await Task.find();
        
        return tasks
    }

    async editTasks(_id: string, theme: string, description: string, priority: string, status: StatusTask,  assessment: string, managers: TaskDocument
    ) :Promise<TaskDocument>{
        await new Task({_id})
        const tasktheme = new Task({theme, description, priority, status, assessment, managers }).save();

        return tasktheme
    }

    async consultNameTask( _id: string){
        const taskName = await Task.findById(_id );        

        if(taskName){
            return taskName
        }       
    }

    async consultRecord( status: StatusTask.RESOLVED){
        const taskstate = await Task.find( {status} );        

        if(taskstate){
            return taskstate
        }       
    }

}