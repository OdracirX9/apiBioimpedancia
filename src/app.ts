import express, {Application, Request, Response} from "express"
import { conectionMySql } from "./database";
import morgan from "morgan"
import cors, { CorsOptions } from "cors";
import * as mysql2 from 'mysql2/promise';



//IMPORTANDO RUTAS ESTABLECIDAS
import IndexRouter from "./routes/index.routes";


export const connectionSQL = new conectionMySql()

export class App{
    private app: Application
    private ipHabilitada: {[key:string]:string}
    public pool: mysql2.Pool

    constructor(){
        this.ipHabilitada = {
            "clinica":"http://190.121.150.213"
        }

        this.app = express();
        this.app.set('port', process.env.PORT || 4100);
        this.middlewares();
        this.routes()
        this.pool = connectionSQL.pool
    }

    private corsOpcion: CorsOptions = {
        origin: (origin, callback)=>{
            if(origin === this.ipHabilitada.clinica){
                callback(null,true);
            } else {
                callback(new Error('Not allowed by Cors'))
            }
        }
    }

    private middlewares(){
        this.app.use(morgan('dev'))
        this.app.use(express.urlencoded({extended:false}));
        this.app.use(express.json())
        this.app.use(cors())
    }
    private routes(){
        this.app.get('/', (req: Request, res: Response)=>{
            res.json("SERVIDOR ALOJAMIENTO DE DATOS BIOIMPEDANCIA")
        })
        this.app.use('/31415927182832148686260093ulrserverforcrudbioimpedanciometria', IndexRouter)
    }

    private async connectionMysql(): Promise<any>{

        console.log("Iniciando conexion a base de datos")

        const checkConnection = await connectionSQL.check()
        if(checkConnection){
            console.log("Conexion a base de datos establecida")
        } else {
            console.error("Error en la conexion en la base de datos")
        }
    }

    async init(): Promise<void>{
        return new Promise((resolve, reject)=>{
            this.app.listen(this.app.get('port'), ()=>{
                console.log("")
                console.log("\x1b[33m%s\x1b[0m", `|-----| SERVER ON PORT ${this.app.get('port')} |-----|`)
                console.log("")

                this.connectionMysql()

            }).on('error', (err:Error)=> reject(err))
            
        })
     }
}