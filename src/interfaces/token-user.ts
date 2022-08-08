//import {UserRole} from "wizard-nodetypes";

/**
 * @description
 * @export
 * @interface TokenUser
 */
export interface TokenUser {
    _id: string;
    name?: {
        firstName: string;
        lastName: string;
    };
    exp?: number;
    iat?: number;
    company?: string;
    lastLogin?: string;
    login: boolean
}