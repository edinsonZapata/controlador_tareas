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
 export const jwtSecretRegister = process.env.JWT_SECRET_REGISTER || "4C462DB5C33D0FC1F342542FADD84F97EDF3D1F32C0CC6D5DA14921BD6464209";
/**
 * @description
 */
 export const jwtSecret = process.env.JWT_SECRET || '015e321bf7fbcc899587fd457f47ccf7c58e9dc7575a18ea62cd1098';
 /**
 * @description
 */
export const channelCode = process.env.CHANNEL_CODE || "105"
/**
 * @description
 */
 export const defaultInBulkPaginationInsert =  Number(process.env.DEFAULT_IN_BULK_PAGINATION_INSERT) || 10
/**
 * @description
 */
export const axiosInstance = axios.create({httpsAgent: new Agent({rejectUnauthorized: false})})
