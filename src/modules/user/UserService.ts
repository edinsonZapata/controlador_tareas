import { User, UserDocument, UserRole } from "nodetypes_tareas";

/**
 * @description
 * @export
 * @class UserService
 */
export class UserService {

    async createUser(
        name: {firstName: string, lastName: string}, username: string, password: string,
        role: UserRole
    ): Promise<UserDocument> {
        const userSaved = await new User({ name, username, password, role}).save();
        
        return userSaved
    }

    async consultUser( id: string){
        const userConsult = await User.findById(id);
        
        if(userConsult){
            return userConsult
        }
    }
}