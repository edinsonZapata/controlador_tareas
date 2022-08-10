import { Task, StatusTask } from "nodetypes_tareas";

export class TasksService {
    async createTask(
        theme: string, description: string, priority: string, status: StatusTask, 
        assessment: string, managers: string
    ) {
        const taskSaved = await new Task({ theme, description, priority, status, assessment, managers}).save();
        
        return taskSaved
    }

    async consultAllTasks() {
        const tasks = await Task.find();
        
        return tasks
    }
}