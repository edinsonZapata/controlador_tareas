import { User, RegistryDocument, UserRole, TypeDocuments, Registry } from "nodetypes_tareas";

/**
 * @description
 * @export
 * @class UserService
 */
export class UserService {

    async createUser(
        name: {firstName: string, lastName: string}, email: string,role: UserRole, typeDocument: TypeDocuments, numberDocument: number, password: string
        
    ): Promise<RegistryDocument> {
        const userSaved = await new Registry({ name,email, role,typeDocument,numberDocument, password}).save();
        
        return userSaved
    }

    async consultUser( id: string){
        const userConsult = await User.findById(id);
        
        if(userConsult){
            return userConsult
        }
    }
}