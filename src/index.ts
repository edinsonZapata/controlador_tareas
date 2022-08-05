import { config } from "dotenv";
config();

import express from 'express';
import { serverPort } from "./configurations";
import { connectToMongoDB } from 'tareas-nodetypes';

const app = express();
connectToMongoDB();

app.get('/',function (req, res) {
    console.log("funcionando")
})

app.listen(serverPort, function(){
    console.log("escuchando servidor");
})