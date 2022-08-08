import express, { Request, Response, Router } from 'express';

const user = Router();

user.get('/', (req: Request, res: Response) => {
  res.send("estoy en usuario");
});

user.post('/', (req: Request, res: Response) => {
    console.log(req.body);
    res.send("usuario creado");
});

export { user };