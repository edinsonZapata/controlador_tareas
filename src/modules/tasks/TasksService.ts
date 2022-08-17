import { Task, StatusTask, TaskDocument } from "nodetypes_tareas";

export class TasksService {
    async createTask(
        theme: string, description: string, priority: string, status: StatusTask, 
        assessment: string, managers: TaskDocument
    ) :Promise<TaskDocument> {

        const taskSaved = await new Task({theme, description, priority, status, assessment}).save();
       /* managers.managers.push(taskSaved);
        await theme.save()*/
        return taskSaved
    }

    async consultAllTasks() {
        const tasks = await Task.find();
        
        return tasks
    }

    

    async consultNameTask( id: string ){
        const taskName = await Task.findById(id);        

        if(taskName){
            return taskName
        }       
    }
}