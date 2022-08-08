import { config } from "dotenv";
config();

// import express from 'express';
// import { serverPort } from "./configurations";
// import { connectToMongoDB } from 'tareas-nodetypes';
// import { router } from './modules/index'

// const app = express();
// connectToMongoDB();

// app.listen(serverPort, function(){
//     console.log("escuchando servidor ",serverPort);
// })

// app.use(router);

import 'reflect-metadata';
import { Controllers } from "./modules";
import { Server } from "componente-base";
import { serverPort } from "./configurations";
import { connectToMongoDB, mongoDbConnection } from "tareas-nodetypes";

export const connectionString = process.env.MONGODB_CONNECTION_STRING

console.log("conection",connectionString);

/**
 * descripción 
 * @type {*}
 */
const server = Server.instance();
server.initiateAndStart(
    Controllers, Number(serverPort), 'f0d032eaf2bd6f70.crt', 'f0d032eaf2bd6f70.key',
    mongoDbConnection, connectToMongoDB
).catch((error) => console.log("[INITIAL][ERROR]", error));