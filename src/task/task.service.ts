import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createTaskDTO } from './DTO/createTaskDTO';
import { updateTaskDTO } from './DTO/updateTaskDTO';

@Injectable()
export class TaskService {

    constructor(private prismaService : PrismaService){}

    getAll(userID:number){
        return this.prismaService.todo.findMany({
            where:{
                userId:userID
            }
        })
    }


    async getById(userID:number,taskID:number){
        const task =  await this.prismaService.todo.findUnique({
            where:{
                userId:userID,
                id:taskID
            }
        });
        return task
    }


    getActive(id:number){
        const tasks = this.prismaService.todo.findMany({
            where:{
                userId:id,
                isActive:true
            }
        });

        return tasks;
    }

    async create(userID:number,body:createTaskDTO){
        const taksCreated = await this.prismaService.todo.create({
            data:{
                userId:userID,
                ...body
            }
        });
        return taksCreated;
    }


    async update(userID:number,taskID:number,body:updateTaskDTO){
        const taks = await this.prismaService.todo.findFirst({
            where:{
                userId:userID,
                id:taskID
            }
        })

        if(!taks || taks.userId != userID){
            throw new ForbiddenException('Access to resources denied',);
        }

        return this.prismaService.todo.update({
            where: {
              id: taskID,
            },
            data: {
              ...body,
            },
          });
    }


    async delete(userID:number,taskID:number){
        const taks = await this.prismaService.todo.findFirst({
            where:{
                userId:userID,
                id:taskID
            }
        })

        if(!taks || taks.userId != userID){
            throw new ForbiddenException('Access to resources denied',);
        }

        await this.prismaService.todo.delete({
            where:{
                id:taskID,
            }
        })

        return 'task deleted successfully'
    }
}
