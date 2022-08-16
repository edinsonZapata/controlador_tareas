import {Controller, Get, MakeBadRequest, Post, Put} from "componente-base";
import {Request, Response} from 'express'
import {JWTMiddleware, AccessPolicy} from "../../utils";
import {UserService} from "./UserService";
import {NextFunction} from "express";



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

          if(!name || !name.firstName || !name.lastName || !email || !role  || !typeDocument || !numberDocument|| !password) {
              return response.status(400).json(MakeBadRequest(`Invalid parameters`));
          }
          
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

  @Get('/consultUser')
  async consultOneUser(request: Request, response: Response, next: NextFunction) {
    try {
    const {id} = request.body

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
}