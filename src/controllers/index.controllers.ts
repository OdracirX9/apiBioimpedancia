import { Request, Response } from "express";

//IMPORTANDO LA CONEXION DE LA BASE DE DATOS
import { connectionSQL } from "../app";

import { client, antropometria, bioimpedancia, antro_bio } from "../interface/interfaces";


//COMPROBACION DE CONEXION A LA BASE DE DATOS
const checkConnection = async(res: Response)=>{
    const checkConnection = await connectionSQL.check()
    if(!checkConnection){
        return res.status(503).json('NO SE ESTABLECIO LA CONEXION CON LA BASE DE DATOS')
    }
}

export const indexControllers = {

    getClients: async(req: Request, res: Response)=>{
        try {
            const [result] = await connectionSQL.pool.query('SELECT * FROM info_paciente ORDER BY create_at DESC')
            res.json(result)
        } catch (error) {
            res.json(error)
        }
    },

    getClient: async(req: Request, res: Response)=>{
        const params = req.params.id
        let queryFecha: any = req.query.date
        let queryPaciente: string
        let arrayQueryPaciente: any[]
        
        let year = '';
        let month = '';
        let day = '';


        try {
            //const [result]:any = await connectionSQL.pool.query('SELECT * FROM info_paciente WHERE id_paciente = ? LIMIT 1', [params])

            const [count]:any = await connectionSQL.pool.query('SELECT create_at FROM _antropometria WHERE id_paciente = ? ORDER BY create_at DESC',[params])

            if(count.length === 0)  {
                return res.json({
                    //"paciente":result[0],
                    //"query":{
                        "id_paciente": params,
                        "count":count,
                        "antropometria":{},
                        "bioimpedanciometria":{},
                    //}
                })
            }

            if(queryFecha){
                queryFecha = new Date(String(req.query.date))
                year = queryFecha.getUTCFullYear()
                month = queryFecha.getUTCMonth() + 1
                day = queryFecha.getUTCDate()
                queryPaciente = `SELECT * FROM _antropometria WHERE id_paciente = ? AND YEAR(create_at) = ? AND MONTH(create_at) = ? AND DAY(create_at) = ? LIMIT 1`
                arrayQueryPaciente = [params,year,month,day]
            } else {
                queryPaciente = 'SELECT * FROM _antropometria WHERE id_paciente = ? ORDER BY create_at DESC LIMIT 1'
                arrayQueryPaciente = [params]
            }
                
            const [result2]:any = await connectionSQL.pool.query(queryPaciente,arrayQueryPaciente)

            if(result2.length === 0)  {
                return res.json({
                    //"paciente":result[0],
                    //"query":{
                        "id_paciente": params,
                        "count":count,
                        "antropometria":{},
                        "bioimpedanciometria":{},
                    //}
                })
            }

            if(!queryFecha){
                year = `${result2[0].create_at.getUTCFullYear()}`
                month = `${result2[0].create_at.getUTCMonth() + 1}`
                day = `${result2[0].create_at.getUTCDate()}`
            }
            
            const [result3]:any = await connectionSQL.pool.query('SELECT * FROM _bioimpedanciometria WHERE id_paciente = ? AND YEAR(create_at) = ? AND MONTH(create_at) = ? AND DAY(create_at) = ? LIMIT 1', [params, year,month,day])

            res.json({
                //"paciente":result[0],
                //"query":{
                    "id_paciente": params,
                    "count":count,
                    "antropometria":result2[0],
                    "bioimpedanciometria":result3[0],
                //},
            })
        } catch (error) {
            console.log(error)
            res.json(error)
        }
    },

    getClientExamenes: async(req: Request, res: Response)=>{
        const params = req.params.id
        let queryFecha: any = req.query.date
        let queryPaciente: string
        let arrayQueryPaciente: any[]
        
        let year = '';
        let month = '';
        let day = '';


        try {
            //const [result]:any = await connectionSQL.pool.query('SELECT * FROM info_paciente WHERE id_paciente = ? LIMIT 1', [params])

            const [count]:any = await connectionSQL.pool.query('SELECT create_at FROM _examenes_laboratorios WHERE id_paciente = ? ORDER BY create_at DESC',[params])

            if(count.length === 0)  {
                return res.json({
                    //"paciente":result[0],
                    //"query":{
                        "count":count,
                        "examenes_laboratorios":{},
                    //}
                })
            }

            if(queryFecha){
                queryFecha = new Date(String(req.query.date))
                year = queryFecha.getUTCFullYear()
                month = queryFecha.getUTCMonth() + 1
                day = queryFecha.getUTCDate()
                queryPaciente = `SELECT * FROM _examenes_laboratorios WHERE id_paciente = ? AND YEAR(create_at) = ? AND MONTH(create_at) = ? AND DAY(create_at) = ? LIMIT 1`
                arrayQueryPaciente = [params,year,month,day]
            } else {
                queryPaciente = 'SELECT * FROM _examenes_laboratorios WHERE id_paciente = ? ORDER BY create_at DESC LIMIT 1'
                arrayQueryPaciente = [params]
            }
                
            const [result2]:any = await connectionSQL.pool.query(queryPaciente,arrayQueryPaciente)

            if(result2.length === 0)  {
                return res.json({
                    //"paciente":result[0],
                    //"query":{
                        "count":count,
                        "examenes_laboratorios":{},
                    //}
                })
            }

            return res.json({
                //"paciente":result[0],
                //"query":{
                    "count":count,
                    "examenes_laboratorios":result2[0],
                //},
            })
        } catch (error) {
            console.log(error)
            res.json(error)
        }
    },

    getClientDosis: async(req: Request, res: Response)=>{
        const params = req.params.id
        let queryFecha: any = req.query.date
        let queryPaciente: string
        let arrayQueryPaciente: any[]
        
        let year = '';
        let month = '';
        let day = '';


        try {
            //const [result]:any = await connectionSQL.pool.query('SELECT * FROM info_paciente WHERE id_paciente = ? LIMIT 1', [params])

            const [count]:any = await connectionSQL.pool.query('SELECT created_at FROM _dosis WHERE id_paciente = ? ORDER BY created_at DESC',[params])

            if(count.length === 0)  {
                return res.json({
                    //"paciente":result[0],
                    //"query":{
                        "count":count,
                        "dosis":{},
                    //}
                })
            }

            if(queryFecha){
                queryFecha = new Date(String(req.query.date))
                year = queryFecha.getUTCFullYear()
                month = queryFecha.getUTCMonth() + 1
                day = queryFecha.getUTCDate()
                queryPaciente = `SELECT * FROM _dosis WHERE id_paciente = ? AND YEAR(created_at) = ? AND MONTH(created_at) = ? AND DAY(created_at) = ? LIMIT 1`
                arrayQueryPaciente = [params,year,month,day]
            } else {
                queryPaciente = 'SELECT * FROM _dosis WHERE id_paciente = ? ORDER BY created_at DESC LIMIT 1'
                arrayQueryPaciente = [params]
            }
                
            const [result2]:any = await connectionSQL.pool.query(queryPaciente,arrayQueryPaciente)

            if(result2.length === 0)  {
                return res.json({
                    //"paciente":result[0],
                    //"query":{
                        "count":count,
                        "dosis":{},
                    //}
                })
            }

            return res.json({
                //"paciente":result[0],
                //"query":{
                    "count":count,
                    "dosis":result2[0],
                //},
            })
        } catch (error) {
            console.log(error)
            res.json(error)
        }
    },

    getClientAntecedentes: async(req: Request, res: Response)=>{
        const params = req.params.id
        let queryFecha: any = req.query.date
        let queryPaciente: string
        let arrayQueryPaciente: any[]
        
        let year = '';
        let month = '';
        let day = '';


        try {
            //const [result]:any = await connectionSQL.pool.query('SELECT * FROM info_paciente WHERE id_paciente = ? LIMIT 1', [params])

            const [count]:any = await connectionSQL.pool.query('SELECT created_at FROM _antecedentes WHERE id_paciente = ? ORDER BY created_at DESC',[params])

            if(count.length === 0)  {
                return res.json({
                    //"paciente":result[0],
                    //"query":{
                        "count":count,
                        "antecedentes":{},
                    //}
                })
            }

            if(queryFecha){
                queryFecha = new Date(String(req.query.date))
                year = queryFecha.getUTCFullYear()
                month = queryFecha.getUTCMonth() + 1
                day = queryFecha.getUTCDate()
                queryPaciente = `SELECT * FROM _antecedentes WHERE id_paciente = ? AND YEAR(created_at) = ? AND MONTH(created_at) = ? AND DAY(created_at) = ? LIMIT 1`
                arrayQueryPaciente = [params,year,month,day]
            } else {
                queryPaciente = 'SELECT * FROM _antecedentes WHERE id_paciente = ? ORDER BY created_at DESC LIMIT 1'
                arrayQueryPaciente = [params]
            }
                
            const [result2]:any = await connectionSQL.pool.query(queryPaciente,arrayQueryPaciente)

            if(result2.length === 0)  {
                return res.json({
                    //"paciente":result[0],
                    //"query":{
                        "count":count,
                        "antecedentes":{},
                    //}
                })
            }

            return res.json({
                //"paciente":result[0],
                //"query":{
                    "count":count,
                    "antecedentes":result2[0],
                //},
            })
        } catch (error) {
            console.log(error)
            res.json(error)
        }
    },

    createClient: async(req:Request, res:Response)=>{
        const newClient: client = req.body
   
        try {
            const result:any = await connectionSQL.pool.query('INSERT INTO info_paciente (nombre,apellido,cedula,sexo,celular,fecha_nacimiento,ocupacion,direccion,estado_civil) VALUES (?,?,?,?,?,?,?,?,?)',[newClient.nombre,newClient.apellido,newClient.cedula,newClient.sexo,JSON.stringify(newClient.celular),newClient.fecha_nacimiento,newClient.ocupacion,newClient.direccion,newClient.estado_civil])

            res.json(result[0])

        } catch (error) { 
            console.log(error)
            res.json(error)
        }
    },

    createBio: async(req:Request, res:Response)=>{
        const params = req.params.id
        const newBio: antro_bio = req.body
        const a = newBio.antropometria
        const b = newBio.bioimpedancia

        try {
            
            //CREAR ANTROPOMETRIA
            const result: any = await connectionSQL.pool.query('INSERT INTO _antropometria (id_paciente, peso, talla, cms_perimetro_cintura, cms_perimetro_cadera, cms_perimetro_cuello, contorno_muneca, create_at) VALUES (?,?,?,?,?,?,?,?)',[params, a.peso, a.talla, a.cms_perimetro_cintura, a.cms_perimetro_cadera, a.cms_perimetro_cuello, a.contorno_muneca, a.create_at])


            //CREAR BIOIMPEDANCIA
            const result2: any = await connectionSQL.pool.query('INSERT INTO _bioimpedanciometria (id_paciente, grasa_corporal, masa_muscular, kca_basal, edad_corporal, grasa_visceral, create_at) VALUES (?,?,?,?,?,?,?)',[params, b.grasa_corporal, b.masa_muscular, b.kca_basal, b.edad_corporal, b.grasa_visceral, b.create_at])

            console.log({
                "antropometria":result[0],
                "bioimpedancia":result2[0]
            })

            res.json({
                "antropometria":result[0],
                "bioimpedancia":result2[0]
            })

        } catch (error) {
            console.log(error)
            res.json(error)
        }
    },

    createExamenes: async(req:Request, res:Response)=>{
        
        const params = req.params.id
        const newExamen = await req.body
        console.log(newExamen)

        let keys = Object.keys(newExamen.proce).join(', ')
        const values = [params, ...Object.values(newExamen.proce)]
        let placeholder = Object.keys(newExamen.proce).map(()=> '?').join(',')

        if(newExamen.otro){
            keys = `${keys}, otro`
            values.push(JSON.stringify(newExamen.otro))
            placeholder = `${placeholder},?`
        } 

        const query = `INSERT INTO _examenes_laboratorios (id_paciente, ${keys}) VALUES (?,${placeholder})`

        try {
            console.log(values)
            const result: any = await connectionSQL.pool.query(query,values)
            res.json(result[0])
        } catch (error) {
            res.json(error)
        }
    },

    createDosis: async(req:Request, res:Response)=>{
        const params = req.params.id
        const newDosis = req.body

        let keysProv = Object.keys(newDosis.dosis)
        let keys = keysProv.join(', ')
        const values = [params, ...Object.values(newDosis.dosis)]
        let placeholder = Object.keys(newDosis.dosis).map(()=> '?').join(',')

        if(newDosis.otro){
            keys = `${keys}, otro`
            values.push(JSON.stringify(newDosis.otro))
            placeholder = `${placeholder},?`
        } 

        const query = `INSERT INTO _dosis (id_paciente, ${keys}) VALUES (?,${placeholder})`

        try {
            const result: any = await connectionSQL.pool.query(query,values)
            res.json(result[0])
        } catch (error) {
            res.json(error)
        }
    },

    createAntecedentes: async(req:Request, res:Response)=>{
        const params = req.params.id
        const newAntecedentes = req.body

        const query = `INSERT INTO _antecedentes (id_paciente, info_adicional) VALUES (?,?)`

        try {
            const result: any = await connectionSQL.pool.query(query,[params, JSON.stringify(newAntecedentes.ante)])
            res.json(result[0])
        } catch (error) {
            res.json(error)
        }
    }


}