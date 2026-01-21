import bcrypt from 'bcryptjs'
import envConfig from '../config/envConfig'
export const generateHashPassword = async (password: string) => bcrypt.hash(password,envConfig.BCRYPT_SALT)
export const comparePassword = async (rawPassword:string,hashedPassword:string)=>await bcrypt.compare(rawPassword,hashedPassword)