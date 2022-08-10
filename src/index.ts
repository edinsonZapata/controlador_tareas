import { config } from "dotenv";
config();

import 'reflect-metadata';
import { Controllers } from "./modules";
import { Server } from "componente-base";
import { serverPort } from "./configurations";
import { connectToMongoDB, mongoDbConnection } from "nodetypes_tareas";

/**
 * descripción 
 * @type {*}
 */
const server = Server.instance();
server.initiateAndStart(
    Controllers, Number(serverPort), 'f0d032eaf2bd6f70.crt', 'f0d032eaf2bd6f70.key',
    mongoDbConnection, connectToMongoDB
).catch((error) => console.log("[INITIAL][ERROR]", error));