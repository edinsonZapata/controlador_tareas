import { NextFunction, Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";
import { User, Registry } from "nodetypes_tareas";
import { jwtSecret, jwtSecretRegister } from "../configurations";

/**
 * @description
 */
export const JWTMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /**
   * descripción 
   * @type {*}
   */
  const headerToken = <string>req.headers["authorization"];
  if (!headerToken || !headerToken.includes("Bearer ")) {
    return res.status(401).json({ message: "Invalid token" });
  }
  /**
   * descripción 
   * @type {*}
   */
  const token = headerToken.split("Bearer ")[1];
  /**
   * descripción 
   * @type {*}
   */
  let jwtPayload;
  try {
    jwtPayload = <any>verify(token, jwtSecret);
    res.locals.user = jwtPayload;
    /**
     * descripción 
     * @type {*}
     */
    const user = await User.findById(jwtPayload._id, '-password');
    res.locals.decodedUser = user;
    /**
     * descripción 
     * @type {*}
     */
     let dbLastLogin: number;
    if(user){
      dbLastLogin = Number(
        (user.lastLogin.getTime() / 1000).toString().replace(/\.\d+/, "")
      );
    }else{
      dbLastLogin = 0;
    }

    if (dbLastLogin > jwtPayload.iat) {
      return res.status(401).json({ message: "Invalid token" });
    }
    /**
     * descripción 
     * @type {*}
     */
    const { userId, username } = jwtPayload;
    /**
     * descripción 
     * @type {*}
     */
    const newToken = sign({ userId, username }, jwtSecret, {
      expiresIn: "24h",
    });
    res.setHeader("token", newToken);
    next();
  } catch (error) {
    try {
      /**
       * descripción 
       * @type {*}
       */
      const jwtPayload = <any>verify(token, jwtSecretRegister);
      /**
       * descripción 
       * @type {*}
       */
      const { idRegister } = jwtPayload;
      /**
       * descripción 
       * @type {*}
       */
      const register = await Registry.findById(idRegister);
      
      if (!register)
        return res.status(401).json({ message: "Invalid register" });
      
        if (!register.urlValidityDate)
        return res.status(401).json({ message: "Expired token" });

      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  }
};