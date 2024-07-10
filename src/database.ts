import * as mysql2 from 'mysql2/promise';
import { keys } from './config/config';

export class conectionMySql {
    public pool: mysql2.Pool

    constructor(){
        this.pool = mysql2.createPool({
            host:keys.mysql.host,
            user:keys.mysql.user,
            password:keys.mysql.password,
            port: keys.mysql.port,
            database: keys.mysql.database,
            waitForConnections: true,
            connectionLimit: 10, // Máximo 10 conexiones activas a la vez
            queueLimit: 0 
        })
    }

    async check(): Promise<boolean>{
        try {
            const connection = await this.pool.getConnection();
            return true
        } catch (error) {
            return false
        }
    }

}