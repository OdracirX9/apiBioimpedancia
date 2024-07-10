import dotenv from 'dotenv'
dotenv.config();

export const keys = {
    mysql:{
        host: process.env.HOST_MYSQL,
        user:process.env.USER_MYSQL,
        password:process.env.PASS_MYSQL,
        port: parseInt(process.env.PORT_MYSQL || "3306",10),
        database:process.env.DB_MYSQL,
    }
}