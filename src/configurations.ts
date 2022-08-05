import {Agent} from "https";
import axios from 'axios'

/**
 * @description
 */
export const serverPort = process.env.PORT || 3000;
/**
 * @description
 */
export const mongodbConnectionString = process.env.MONGODB_CONNECTION_STRING;
/**
 * @description
 */
export const axiosInstance = axios.create({httpsAgent: new Agent({rejectUnauthorized: false})})
