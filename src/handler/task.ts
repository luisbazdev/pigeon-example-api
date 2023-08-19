import { IncomingMessage, ServerResponse } from "node:http";
import { Pigeon, IPigeonHandler, JWTAuthentication } from "pigeon-core"
import { TaskRepository } from "../repository/task";
/**
 * This handler will catch all requests to "/api/tasks/*"
 * please check https://github.com/luisbazdev/pigeon-framework 
 * for more understanding :)
 */
const taskHandler: IPigeonHandler = Pigeon.createHandler("/tasks");

/**
 * GET method handler for "/api/tasks" route.
 * @param {IncomingMessage} request - The incoming request object.
 * @param {ServerResponse} response - The server response object.
 */
taskHandler.GET("/", async (request: IncomingMessage, response: ServerResponse) => {
  try {
    const tasks = await TaskRepository.findAll();
    response.status(200).json({tasks})
  } catch (error) {
    response.status(500).json({error: "An unexpected error occurred"});
  }
});

/**
 * GET method handler for "/api/tasks/:id" route.
 * @param {IncomingMessage} request - The incoming request object.
 * @param {ServerResponse} response - The server response object.
 */
taskHandler.GET("/:taskId", async (request: IncomingMessage, response: ServerResponse) => {
  try {
    const { taskId } = request.params;
    const task = await TaskRepository.findById(parseInt(taskId));
    response.status(200).json({task});
  } catch (error) {
    response.status(500).json({error: "An unexpected error occurred"});
  }
});

/**
 * POST method handler for "/api/tasks" route.
 * @param {IncomingMessage} request - The incoming request object.
 * @param {ServerResponse} response - The server response object.
 */
taskHandler.POST("/", async (request: IncomingMessage, response: ServerResponse) => {
  try {
    const { text } = request.body;
    const task = await TaskRepository.create({text})
    response.status(200).json({
      message: "Task successfully created.",
      task
    })
  } catch (error) {
    response.status(500).json({error: "An unexpected error occurred"});
  }
}, [JWTAuthentication]);

/**
 * PUT method handler for "/api/tasks/:id" route.
 * @param {IncomingMessage} request - The incoming request object.
 * @param {ServerResponse} response - The server response object.
 */
taskHandler.PUT("/:taskId", async (request: IncomingMessage, response: ServerResponse) => {
  try {
    const { taskId } = request.params;
    const { text } = request.body;
    const task = await TaskRepository.update(parseInt(taskId), {text});
    response.status(200).json({
      message: "Task successfully updated.",
      task
    })
  } catch (error) {
    response.status(500).json({error: "An unexpected error occurred"});
  }
}, [JWTAuthentication]);

/**
 * DELETE method handler for "/api/tasks" route.
 * @param {IncomingMessage} request - The incoming request object.
 * @param {ServerResponse} response - The server response object.
 */
taskHandler.DELETE("/:taskId", async (request: IncomingMessage, response: ServerResponse) => {
  try {
    const { taskId } = request.params;
    const task = await TaskRepository.delete(parseInt(taskId));
    response.status(200).json({
      message: "Task successfully deleted.",
      task
    })
  } catch (error) {
    response.status(500).json({error: "An unexpected error occurred"});
  }
}, [JWTAuthentication]);

