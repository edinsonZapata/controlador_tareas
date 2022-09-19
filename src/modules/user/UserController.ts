import {Controller, Get, MakeBadRequest, Post} from "componente-base";
import {Request, Response} from 'express'
// import {JWTMiddleware, AccessPolicy} from "../../utils";
import {UserService} from "./UserService";
import {jwtSecret, jwtSecretRegister} from "../../configurations";
import {User, Registry, UserRole } from "nodetypes_tareas";
import {NextFunction} from "express";
import { sign } from "jsonwebtoken";
// import { get } from "lodash";



@Controller('/user')
export class UserController {

    
  private userService: UserService;
  
  /**
   * Creates an instance of UserController.
   */
  constructor() {
      this.userService = new UserService()
  }

  @Post('/')
  async Create(request: Request, response: Response, next: NextFunction) {
      try {
          /**
           * descripción 
           * @type {*}
           */
          const {name, email , role,typeDocument,numberDocument, password} = request.body

        console.log(name, email, role, typeDocument,numberDocument, password);

          if(!name || !email || !role  || !typeDocument || !numberDocument|| !password) {
              return response.status(400).json(MakeBadRequest(`Invalid parameters`));
          }
          
            await this.userService.createUsers(email ,role, password )

          await this.userService.createUser(name, email ,role, typeDocument, numberDocument, password )          
              .then(user => response.json(user))
              .catch(error => {
                  console.error("[USER CONTROLLER][ERROR]", error)
                  response.status(500).json(error)
              })
      } catch (err) {
          next(err)
      }
  }

  @Get('/consultUser/:id')
  async consultOneUser(request: Request, response: Response, next: NextFunction) {
    try {
    const {id} = request.params
        console.log(id);
    if(!id) {
        return response.status(400).json(MakeBadRequest(`Invalid parameters`));
    }

        await this.userService.consultUser(id)
         .then(user => response.status(200).json(user))
         .catch(error => {
            console.error("[USER CONTROLLER][ERROR]", error)
            response.status(500).json(error)
        })

    } catch (err) {
        next(err)
    }
  }

  @Get('/consultAllUsers')
  async consultAllUsers(request: Request, response: Response, next: NextFunction){
    try {        
        await this.userService.consultAllUser()
        .then(user => response.status(200).json(user))
        .catch(error => {
            console.error("[USER CONTROLLER][ERROR]", error);
            response.status(500).json(error);
        })
    } catch (err) {
        next(err)
    }
  }

  @Post('/login')
    async Login(request: Request, response: Response, next: NextFunction) {
        try {

            const { email, password, register: registryid} = request.body;
            const userlogin = await User.findOne({ email, registry: registryid });            
            console.log(userlogin);

            if (!userlogin)  {
                return response.status(401).json({ status: 'error', code: 'unauthorized' });
            }
            
            const isUser = userlogin.comparePassword(password);

            if (!isUser) {
                return response.status(401).json({ status: 'error', code: 'unauthorized' })
            }
            

            // if (userlogin.role === UserRole.ADMIN) {
            //     const usersState = await User.findOne({ user: userlogin._id });
            //     if (!usersState.disable) {
            //         return response.status(401).json({ status: 'error', code: 'disabled' })
            //     }              
            // }

            const firstLogin = !userlogin.lastLogin
            userlogin.lastLogin = new Date();          

            const payload = {
                _id: userlogin._id,
                email: userlogin.email,
                password: userlogin.password,
                lastLogin: userlogin.lastLogin,
                firstLogin
            }
            
            await userlogin.save();
            const token = sign(payload, jwtSecret, { expiresIn: '24h' });
            response.json({ success: true, token: `Bearer ${token}` })

        } catch (err) {
            console.error("[AUTH CONTROLLER][ERROR]", err)
            next(err)
        }
    }

    @Post("/token-register")
    async token(request: Request, response: Response, next: NextFunction){
        try {
            const { idRegister } = request.body;
            const register = await Registry.findById(idRegister);
            if (!register) return response.status(409).json("invalid register id") 
            const token = sign({ idRegister }, jwtSecretRegister, { expiresIn: '1h' });
            response.json({ success: true, token: `Bearer ${token}` })
        } catch (error) {
            console.error("[AUTH CONTROLLER][ERROR]", error)
            next(error)
        }
    }

  @Get('/updateInfoUser')
    async updateUsers(request: Request, response: Response, next: NextFunction){
        try {

            //const _id = await  User.findById( id )
            const {id } =  request.body
            
            await this.userService.consultUser(id)
            .then(user => response.status(200).json(user))
            .catch(error =>{
                console.error("[USER CONTROLLER][ERROR]", error);
                response.status(500).json(error);
            })
            console.log(User.name);
        } catch (err) {
            console.error("[AUTH CONTROLLER][ERROR]", err)
            next(err)
        }
    }
}