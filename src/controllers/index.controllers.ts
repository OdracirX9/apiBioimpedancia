import { Request, Response } from "express";

//IMPORTANDO LA CONEXION DE LA BASE DE DATOS
import { connectionSQL } from "../app";

import { client, antropometria, bioimpedancia, antro_bio } from "../interface/interfaces";
import { PdfData, CreatePdf } from "../config/createPdf/createpdf";
import { ResultsPam } from "../config/formulacion";


//COMPROBACION DE CONEXION A LA BASE DE DATO
const checkConnection = async(res: Response)=>{
    const checkConnection = await connectionSQL.check()
    if(!checkConnection){
        return res.status(503).json('NO SE ESTABLECIO LA CONEXION CON LA BASE DE DATOS')
    }
}

async function prueba():Promise<void>{
    const fecha = "2024-08-13"
    const paciente = "994162ea-58ef-11ef-91db-525400f45103"
    const consultaExists = "SELECT * from _antropometria WHERE created_at = ? AND id_paciente = ?"
    try {
        const [ifExistin] = await connectionSQL.pool.query(consultaExists,[fecha, paciente])
        console.log(ifExistin)
        console.log("------------------")
    } catch (error) {
        console.log(error)
    }
    
   
}


export const indexControllers = {

    getClients: async(req: Request, res: Response)=>{
        const queryHow = isNaN(Number(req.query.how))? 0 : Number(req.query.how)
        let client30 = 30
        const consulta = `
        SELECT u.*, a.created_at AS ultimo
        FROM info_paciente u
        LEFT JOIN (
            SELECT id_paciente, MAX(created_at) AS creado
            FROM _antropometria
            GROUP BY id_paciente
        ) AS last ON u.uuid = last.id_paciente
        LEFT JOIN _antropometria a ON a.id_paciente = last.id_paciente AND a.created_at = last.creado
        ORDER BY COALESCE(a.created_at, u.created_at) DESC ;

        `
        try {
            //prueba()
            const [result] = await connectionSQL.pool.query(consulta)
            
            res.json(result)

        } catch (error) {
            res.status(204).json(error)
        }
    },

    getClient: async(req: Request, res: Response)=>{
        const params = req.params.id
        let queryFecha: any = req.query.date
        let queryPaciente: string
        let arrayQueryPaciente: any[]
        let count:any = []
        
        let year = '';
        let month = '';
        let day = '';


        try {
            //const [result]:any = await connectionSQL.pool.query('SELECT * FROM info_paciente WHERE id_paciente = ? LIMIT 1', [params])

            const [countDate]:any = await connectionSQL.pool.query('SELECT created_at FROM _antropometria WHERE id_paciente = ? ORDER BY created_at DESC',[params])
            count = countDate

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
                queryPaciente = `SELECT * FROM _antropometria WHERE id_paciente = ? AND YEAR(created_at) = ? AND MONTH(created_at) = ? AND DAY(created_at) = ? LIMIT 1`
                arrayQueryPaciente = [params,year,month,day]
            } else {
                queryPaciente = 'SELECT * FROM _antropometria WHERE id_paciente = ? ORDER BY created_at DESC LIMIT 1'
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
                year = `${result2[0].created_at.getUTCFullYear()}`
                month = `${result2[0].created_at.getUTCMonth() + 1}`
                day = `${result2[0].created_at.getUTCDate()}`
            }
            
            const [result3]:any = await connectionSQL.pool.query('SELECT * FROM _bioimpedanciometria WHERE id_paciente = ? AND YEAR(created_at) = ? AND MONTH(created_at) = ? AND DAY(created_at) = ? LIMIT 1', [params, year,month,day])

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

            const [count]:any = await connectionSQL.pool.query('SELECT created_at FROM _examenes_laboratorios WHERE id_paciente = ? ORDER BY created_at DESC',[params])

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
                queryPaciente = `SELECT * FROM _examenes_laboratorios WHERE id_paciente = ? AND YEAR(created_at) = ? AND MONTH(created_at) = ? AND DAY(created_at) = ? LIMIT 1`
                arrayQueryPaciente = [params,year,month,day]
            } else {
                queryPaciente = 'SELECT * FROM _examenes_laboratorios WHERE id_paciente = ? ORDER BY created_at DESC LIMIT 1'
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
            const result:any = await connectionSQL.pool.query('INSERT INTO info_paciente (uuid,nombre,apellido,cedula,sexo,celular,fecha_nacimiento,ocupacion,direccion,estado_civil) VALUES (UUID(),?,?,?,?,?,?,?,?,?)',[newClient.nombre,newClient.apellido,newClient.cedula,newClient.sexo,JSON.stringify(newClient.celular),newClient.fecha_nacimiento,newClient.ocupacion,newClient.direccion,newClient.estado_civil])

            const [uuidSearch]:any = await connectionSQL.pool.query('SELECT uuid FROM info_paciente WHERE cedula = ?',[newClient.cedula])
           
            console.log(uuidSearch)
            res.json(uuidSearch[0])
            

        } catch (error) { 
            console.log(error)
            res.json(error)
        }
    },

    createBio: async(req:Request, res:Response)=>{
        const params = req.params.id
        const newBio: antro_bio = req.body
        const a = newBio.antropometria
        console.log(a)
        const b = newBio.bioimpedancia
        let fechaVar:any = a.created_at

        console.log(fechaVar)
        if(!fechaVar){
            let newDate = new Date()
            fechaVar = `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`
        }
        console.log(fechaVar)
        try {
            const consultaExists = "SELECT * from _antropometria WHERE created_at = ? AND id_paciente = ?"
            const [ifExistin]:any = await connectionSQL.pool.query(consultaExists,[fechaVar, params])

            if(ifExistin.length == 0){
                try {
            
                    //CREAR ANTROPOMETRIA
                    const result: any = await connectionSQL.pool.query('INSERT INTO _antropometria (uuid,id_paciente, peso, talla,cintura,cadera,cuello,muneca, created_at) VALUES (UUID(),?,?,?,?,?,?,?,?)',[params, a.peso, a.talla, a.cintura, a.cadera, a.cuello, a.muneca, fechaVar])
        
                    const prueba: any = await connectionSQL.pool.query('SELECT * from _antropometria where id_paciente = "bcc82440-4eb4-11ef-90c6-525400f45103" ')
                    //console.log(prueba[0])
        
        
                    //CREAR BIOIMPEDANCIA
                    const result2: any = await connectionSQL.pool.query('INSERT INTO _bioimpedanciometria (uuid,id_paciente, grasa_corporal, masa_muscular, kca_basal, edad_corporal, grasa_visceral, created_at, regimen, entidad) VALUES (UUID(),?,?,?,?,?,?,?,?,?)',[params, b.grasa_corporal, b.masa_muscular, b.kca_basal, b.edad_corporal, b.grasa_visceral, fechaVar, b.regimen, b.entidad])
        
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
            } else {
                const createConnection = await connectionSQL.pool.getConnection();
                try {
                    const updateQueryAntro = "UPDATE _antropometria SET peso=?, talla=?, cintura=?, cadera=?, cuello=?, muneca=? WHERE created_at = ? AND id_paciente = ?"
                    const updateQueryBio = "UPDATE _bioimpedanciometria SET grasa_corporal=?, masa_muscular=?, kca_basal=?, edad_corporal=?, grasa_visceral=?, regimen=?, entidad=? WHERE created_at = ? AND id_paciente = ?"
                    
                    await createConnection.beginTransaction();

                    const updateAntro = await createConnection.query(updateQueryAntro,[a.peso, a.talla, a.cintura, a.cadera, a.cuello, a.cuello, fechaVar, params])
                    const updateBio = await createConnection.query(updateQueryBio,[b.grasa_corporal, b.masa_muscular, b.kca_basal, b.edad_corporal, b.grasa_visceral, b.regimen, b.entidad, fechaVar, params])

                    await createConnection.commit();
                    res.json("Actualizado")
                } catch (error) {
                    console.log('Error en la transacción, se realizará un rollback:', error)
                    await createConnection.rollback();
                    res.status(2024).json(error)
                } finally {
                    createConnection.release()
                }
                
            }
        } catch (error) {
            res.status(204).json(error)
        }

        //console.log(fechaVar)

        
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

        const query = `INSERT INTO _examenes_laboratorios (uuid,id_paciente, ${keys}) VALUES (UUID(),?,${placeholder})`

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

        const query = `INSERT INTO _dosis (uuid,id_paciente, ${keys}) VALUES (UUID(),?,${placeholder})`

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

        const query = `INSERT INTO _antecedentes (uuid,id_paciente, info_adicional) VALUES (UUID(),?,?)`

        try {
            const result: any = await connectionSQL.pool.query(query,[params, JSON.stringify(newAntecedentes.ante)])
            res.json(result[0])
        } catch (error) {
            res.json(error)
        }
    },

    updateBio: async(req:Request, res:Response)=>{
        const params = req.params.id
        const updateBio: antro_bio = req.body
        const a = updateBio.antropometria
        console.log(a)
        const b = updateBio.bioimpedancia
        let fechaVar:any = b.created_at
    },


    crearPdf: async(req:Request, res:Response)=>{
        const params = req.params.id
        let queryFecha: any = String(req.query.date)
        let queryPaciente: string
        let arrayQueryPaciente: any[]
        
        let year = '';
        let month = '';
        let day = '';

        try {

            const [result]:any = await connectionSQL.pool.query('SELECT * FROM info_paciente WHERE uuid = ? LIMIT 1', [params])

            //console.log('Acto 1')
            
            const [count]:any = await connectionSQL.pool.query('SELECT created_at FROM _antropometria WHERE id_paciente = ? ORDER BY created_at DESC',[params])

            //console.log('Acto 2')

            if(count.length === 0)  {
                return res.status(204).json({
                    'No se encontro informacion del usuario para descargar':count
                })
            }

            //console.log('Acto 3')

            if(queryFecha){
                queryFecha = new Date(queryFecha)
                year = queryFecha.getUTCFullYear()
                month = queryFecha.getUTCMonth() + 1
                day = queryFecha.getUTCDate()
                queryPaciente = `SELECT * FROM _antropometria WHERE id_paciente = ? AND YEAR(created_at) = ? AND MONTH(created_at) = ? AND DAY(created_at) = ? LIMIT 1`
                arrayQueryPaciente = [params,year,month,day]
            } else {
                queryPaciente = 'SELECT * FROM _antropometria WHERE id_paciente = ? ORDER BY created_at DESC LIMIT 1'
                arrayQueryPaciente = [params]
            }
                
            const [result2]:any = await connectionSQL.pool.query(queryPaciente,arrayQueryPaciente)

            //console.log('Acto 4')

            if(!queryFecha){
                year = `${result2[0].created_at.getUTCFullYear()}`
                month = `${result2[0].created_at.getUTCMonth() + 1}`
                day = `${result2[0].created_at.getUTCDate()}`
            }

            
            const [result3]:any = await connectionSQL.pool.query('SELECT * FROM _bioimpedanciometria WHERE id_paciente = ? AND YEAR(created_at) = ? AND MONTH(created_at) = ? AND DAY(created_at) = ? LIMIT 1', [params, year,month,day])

            //console.log('Acto 5')

            const getPac = {
                ...result[0],
                "antropometria":result2[0],
                "bioimpedanciometria":result3[0],
            }


            //console.log('Acto 6')

            if(!getPac.antropometria){
                return res.status(204).json('No existe ningun informe solicitado')
            }

            //console.log('Acto 7')

            
            const varPam:PdfData = ResultsPam(getPac)

            const pdf64 = await CreatePdf(varPam)
      

            res.json(pdf64)

            //console.log('Acto Final')


        } catch (error) {
            console.log(error)
            return res.status(404).json(error)
        }



    }


}

