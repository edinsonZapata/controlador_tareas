import { User, RegistryDocument, UserRole, TypeDocuments, Registry, UserDocument } from "nodetypes_tareas";
import { TokenUser } from "../../interfaces";

/**
 * @description
 * @export
 * @class UserService
 */
export class UserService {

    parseJWT(bearerToken: string): TokenUser{

        if(!bearerToken){
            return { _id: "", login:false };
        }
        const base64Url = bearerToken.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(Buffer.from(base64, 'base64').toString().split("").map(
            (c) => "%" + ("80" + c.charCodeAt(0).toString(16)).slice(-2)).join(""));
       
        return JSON.parse(jsonPayload)
    }

    async createUser(
        name: {firstName: string, lastName: string}, email: string, role: UserRole, typeDocument: TypeDocuments, numberDocument: number, password: string        
    ): Promise<RegistryDocument> {
        const userSaved = await new Registry({ name, email, role, typeDocument, numberDocument, password}).save();
        
        
        return userSaved
    }
    async createUsers(
        email: string, role: string, password: string

        
    ):Promise<UserDocument>{
            const userRegistrySaved = await new User({ email, password, role }).save();
            return userRegistrySaved
    }
    
    async consultUser( id: string){
        const userConsult = await User.findById(id);        
        if(userConsult){
            return userConsult
        }
    }

    async consultAllUser(){
        const userAllUsers = await Registry.find();
        if(userAllUsers){
            return userAllUsers
        }
    }

    // async userLogin(email : string){
    //     const usersLogin = await User.find(email)
    //     if(usersLogin){
    //         return usersLogin
    //     }
    // }
    
}