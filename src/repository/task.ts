import { IRepository } from "pigeon-core";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
/**
 * Repository for Task objects.
 * @type {IRepository}
 *
 * Please check https://github.com/luisbazdev/pigeon-framework 
 * for more understanding :)
 */
export const TaskRepository: IRepository = {
  /**
   * Creates a new task.
   * @param {any} Task - The task data.
   */
  create: async function(Task: any) {
    try {
      const result = await prisma.task.create({
        data: Task
      });
      return result;
    } catch (error) {
      throw error;  
    } finally{
      await prisma.$disconnect();
    }
  },
  /**
   * Finds a task by its ID.
   * @param {number} id - The task ID.
   */
  findById: async function(id: number) {
    try {
      const result = await prisma.task.findUnique({
        where: {
          id,
        },
      });
      return result
    } catch (error) {
      throw error;  
    } finally{
      await prisma.$disconnect();
    }
  },
  /**
   * Finds all tasks.
   */
  findAll: async function () {
    try {
      const result = await prisma.task.findMany();
      return result
    } catch (error) {
      throw error;  
    } finally{
      await prisma.$disconnect();
    }
  },
  /**
   * Updates a task by its ID.
   * @param {number} id - The task ID.
   * @param {any} Task - The updated task data.
   */
  update: async function(id: number, Task: any) {
    try {
      const task = await prisma.task.update({
        data: Task,
        where: {
          id,
        },
      })
      return task;
    } catch (error) {
      throw error;  
    } finally{
      await prisma.$disconnect();
    }
  },
  /**
   * Deletes a task by its ID.
   * @param {number} id - The task ID.
   */
  delete: async function(id: number) {
    try {
      const task = await prisma.task.delete({
        where: {
          id,
        },
      })
      return task;
    } catch (error) {
      throw error;  
    } finally{
      await prisma.$disconnect();
    }
  },
};
