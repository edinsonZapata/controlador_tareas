// import express, { Request, Response, Router } from 'express';
// import { user } from './user/UserController';

// const router = Router();

// router.get('/', (req: Request, res: Response) => {
//   res.send("hola estoy en el router");
// });

// router.use('/user',user);

// export { router };

import { AgentController } from './agent/AgentController'

export const Controllers = [
  AgentController
]