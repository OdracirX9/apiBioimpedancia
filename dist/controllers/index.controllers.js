"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexControllers = void 0;
//IMPORTANDO LA CONEXION DE LA BASE DE DATOS
const app_1 = require("../app");
//COMPROBACION DE CONEXION A LA BASE DE DATO
const checkConnection = async (res) => {
    const checkConnection = await app_1.connectionSQL.check();
    if (!checkConnection) {
        return res.status(503).json('NO SE ESTABLECIO LA CONEXION CON LA BASE DE DATOS');
    }
};
exports.indexControllers = {
    getClients: async (req, res) => {
        try {
            const [result] = await app_1.connectionSQL.pool.query('SELECT * FROM info_paciente ORDER BY created_at DESC');
            res.json(result);
        }
        catch (error) {
            res.json(error);
        }
    },
    getClient: async (req, res) => {
        const params = req.params.id;
        let queryFecha = req.query.date;
        let queryPaciente;
        let arrayQueryPaciente;
        let year = '';
        let month = '';
        let day = '';
        try {
            //const [result]:any = await connectionSQL.pool.query('SELECT * FROM info_paciente WHERE id_paciente = ? LIMIT 1', [params])
            const [count] = await app_1.connectionSQL.pool.query('SELECT created_at FROM _antropometria WHERE id_paciente = ? ORDER BY created_at DESC', [params]);
            if (count.length === 0) {
                return res.json({
                    //"paciente":result[0],
                    //"query":{
                    "id_paciente": params,
                    "count": count,
                    "antropometria": {},
                    "bioimpedanciometria": {},
                    //}
                });
            }
            if (queryFecha) {
                queryFecha = new Date(String(req.query.date));
                year = queryFecha.getUTCFullYear();
                month = queryFecha.getUTCMonth() + 1;
                day = queryFecha.getUTCDate();
                queryPaciente = `SELECT * FROM _antropometria WHERE id_paciente = ? AND YEAR(created_at) = ? AND MONTH(created_at) = ? AND DAY(created_at) = ? LIMIT 1`;
                arrayQueryPaciente = [params, year, month, day];
            }
            else {
                queryPaciente = 'SELECT * FROM _antropometria WHERE id_paciente = ? ORDER BY created_at DESC LIMIT 1';
                arrayQueryPaciente = [params];
            }
            const [result2] = await app_1.connectionSQL.pool.query(queryPaciente, arrayQueryPaciente);
            if (result2.length === 0) {
                return res.json({
                    //"paciente":result[0],
                    //"query":{
                    "id_paciente": params,
                    "count": count,
                    "antropometria": {},
                    "bioimpedanciometria": {},
                    //}
                });
            }
            if (!queryFecha) {
                year = `${result2[0].created_at.getUTCFullYear()}`;
                month = `${result2[0].created_at.getUTCMonth() + 1}`;
                day = `${result2[0].created_at.getUTCDate()}`;
            }
            const [result3] = await app_1.connectionSQL.pool.query('SELECT * FROM _bioimpedanciometria WHERE id_paciente = ? AND YEAR(created_at) = ? AND MONTH(created_at) = ? AND DAY(created_at) = ? LIMIT 1', [params, year, month, day]);
            res.json({
                //"paciente":result[0],
                //"query":{
                "id_paciente": params,
                "count": count,
                "antropometria": result2[0],
                "bioimpedanciometria": result3[0],
                //},
            });
        }
        catch (error) {
            console.log(error);
            res.json(error);
        }
    },
    getClientExamenes: async (req, res) => {
        const params = req.params.id;
        let queryFecha = req.query.date;
        let queryPaciente;
        let arrayQueryPaciente;
        let year = '';
        let month = '';
        let day = '';
        try {
            //const [result]:any = await connectionSQL.pool.query('SELECT * FROM info_paciente WHERE id_paciente = ? LIMIT 1', [params])
            const [count] = await app_1.connectionSQL.pool.query('SELECT created_at FROM _examenes_laboratorios WHERE id_paciente = ? ORDER BY created_at DESC', [params]);
            if (count.length === 0) {
                return res.json({
                    //"paciente":result[0],
                    //"query":{
                    "count": count,
                    "examenes_laboratorios": {},
                    //}
                });
            }
            if (queryFecha) {
                queryFecha = new Date(String(req.query.date));
                year = queryFecha.getUTCFullYear();
                month = queryFecha.getUTCMonth() + 1;
                day = queryFecha.getUTCDate();
                queryPaciente = `SELECT * FROM _examenes_laboratorios WHERE id_paciente = ? AND YEAR(created_at) = ? AND MONTH(created_at) = ? AND DAY(created_at) = ? LIMIT 1`;
                arrayQueryPaciente = [params, year, month, day];
            }
            else {
                queryPaciente = 'SELECT * FROM _examenes_laboratorios WHERE id_paciente = ? ORDER BY created_at DESC LIMIT 1';
                arrayQueryPaciente = [params];
            }
            const [result2] = await app_1.connectionSQL.pool.query(queryPaciente, arrayQueryPaciente);
            if (result2.length === 0) {
                return res.json({
                    //"paciente":result[0],
                    //"query":{
                    "count": count,
                    "examenes_laboratorios": {},
                    //}
                });
            }
            return res.json({
                //"paciente":result[0],
                //"query":{
                "count": count,
                "examenes_laboratorios": result2[0],
                //},
            });
        }
        catch (error) {
            console.log(error);
            res.json(error);
        }
    },
    getClientDosis: async (req, res) => {
        const params = req.params.id;
        let queryFecha = req.query.date;
        let queryPaciente;
        let arrayQueryPaciente;
        let year = '';
        let month = '';
        let day = '';
        try {
            //const [result]:any = await connectionSQL.pool.query('SELECT * FROM info_paciente WHERE id_paciente = ? LIMIT 1', [params])
            const [count] = await app_1.connectionSQL.pool.query('SELECT created_at FROM _dosis WHERE id_paciente = ? ORDER BY created_at DESC', [params]);
            if (count.length === 0) {
                return res.json({
                    //"paciente":result[0],
                    //"query":{
                    "count": count,
                    "dosis": {},
                    //}
                });
            }
            if (queryFecha) {
                queryFecha = new Date(String(req.query.date));
                year = queryFecha.getUTCFullYear();
                month = queryFecha.getUTCMonth() + 1;
                day = queryFecha.getUTCDate();
                queryPaciente = `SELECT * FROM _dosis WHERE id_paciente = ? AND YEAR(created_at) = ? AND MONTH(created_at) = ? AND DAY(created_at) = ? LIMIT 1`;
                arrayQueryPaciente = [params, year, month, day];
            }
            else {
                queryPaciente = 'SELECT * FROM _dosis WHERE id_paciente = ? ORDER BY created_at DESC LIMIT 1';
                arrayQueryPaciente = [params];
            }
            const [result2] = await app_1.connectionSQL.pool.query(queryPaciente, arrayQueryPaciente);
            if (result2.length === 0) {
                return res.json({
                    //"paciente":result[0],
                    //"query":{
                    "count": count,
                    "dosis": {},
                    //}
                });
            }
            return res.json({
                //"paciente":result[0],
                //"query":{
                "count": count,
                "dosis": result2[0],
                //},
            });
        }
        catch (error) {
            console.log(error);
            res.json(error);
        }
    },
    getClientAntecedentes: async (req, res) => {
        const params = req.params.id;
        let queryFecha = req.query.date;
        let queryPaciente;
        let arrayQueryPaciente;
        let year = '';
        let month = '';
        let day = '';
        try {
            //const [result]:any = await connectionSQL.pool.query('SELECT * FROM info_paciente WHERE id_paciente = ? LIMIT 1', [params])
            const [count] = await app_1.connectionSQL.pool.query('SELECT created_at FROM _antecedentes WHERE id_paciente = ? ORDER BY created_at DESC', [params]);
            if (count.length === 0) {
                return res.json({
                    //"paciente":result[0],
                    //"query":{
                    "count": count,
                    "antecedentes": {},
                    //}
                });
            }
            if (queryFecha) {
                queryFecha = new Date(String(req.query.date));
                year = queryFecha.getUTCFullYear();
                month = queryFecha.getUTCMonth() + 1;
                day = queryFecha.getUTCDate();
                queryPaciente = `SELECT * FROM _antecedentes WHERE id_paciente = ? AND YEAR(created_at) = ? AND MONTH(created_at) = ? AND DAY(created_at) = ? LIMIT 1`;
                arrayQueryPaciente = [params, year, month, day];
            }
            else {
                queryPaciente = 'SELECT * FROM _antecedentes WHERE id_paciente = ? ORDER BY created_at DESC LIMIT 1';
                arrayQueryPaciente = [params];
            }
            const [result2] = await app_1.connectionSQL.pool.query(queryPaciente, arrayQueryPaciente);
            if (result2.length === 0) {
                return res.json({
                    //"paciente":result[0],
                    //"query":{
                    "count": count,
                    "antecedentes": {},
                    //}
                });
            }
            return res.json({
                //"paciente":result[0],
                //"query":{
                "count": count,
                "antecedentes": result2[0],
                //},
            });
        }
        catch (error) {
            console.log(error);
            res.json(error);
        }
    },
    createClient: async (req, res) => {
        const newClient = req.body;
        try {
            const result = await app_1.connectionSQL.pool.query('INSERT INTO info_paciente (uuid,nombre,apellido,cedula,sexo,celular,fecha_nacimiento,ocupacion,direccion,estado_civil) VALUES (UUID(),?,?,?,?,?,?,?,?,?)', [newClient.nombre, newClient.apellido, newClient.cedula, newClient.sexo, JSON.stringify(newClient.celular), newClient.fecha_nacimiento, newClient.ocupacion, newClient.direccion, newClient.estado_civil]);
            res.json(result[0]);
        }
        catch (error) {
            console.log(error);
            res.json(error);
        }
    },
    createBio: async (req, res) => {
        const params = req.params.id;
        const newBio = req.body;
        const a = newBio.antropometria;
        const b = newBio.bioimpedancia;
        try {
            //CREAR ANTROPOMETRIA
            const result = await app_1.connectionSQL.pool.query('INSERT INTO _antropometria (uuid,id_paciente, peso, talla,cintura,cadera,cuello,muneca, created_at) VALUES (UUID(),?,?,?,?,?,?,?,?)', [params, a.peso, a.talla, a.cintura, a.cadera, a.cuello, a.muneca, a.created_at]);
            //CREAR BIOIMPEDANCIA
            const result2 = await app_1.connectionSQL.pool.query('INSERT INTO _bioimpedanciometria (uuid,id_paciente, grasa_corporal, masa_muscular, kca_basal, edad_corporal, grasa_visceral, created_at) VALUES (UUID(),?,?,?,?,?,?,?)', [params, b.grasa_corporal, b.masa_muscular, b.kca_basal, b.edad_corporal, b.grasa_visceral, b.created_at]);
            console.log({
                "antropometria": result[0],
                "bioimpedancia": result2[0]
            });
            res.json({
                "antropometria": result[0],
                "bioimpedancia": result2[0]
            });
        }
        catch (error) {
            console.log(error);
            res.json(error);
        }
    },
    createExamenes: async (req, res) => {
        const params = req.params.id;
        const newExamen = await req.body;
        console.log(newExamen);
        let keys = Object.keys(newExamen.proce).join(', ');
        const values = [params, ...Object.values(newExamen.proce)];
        let placeholder = Object.keys(newExamen.proce).map(() => '?').join(',');
        if (newExamen.otro) {
            keys = `${keys}, otro`;
            values.push(JSON.stringify(newExamen.otro));
            placeholder = `${placeholder},?`;
        }
        const query = `INSERT INTO _examenes_laboratorios (uuid,id_paciente, ${keys}) VALUES (UUID(),?,${placeholder})`;
        try {
            console.log(values);
            const result = await app_1.connectionSQL.pool.query(query, values);
            res.json(result[0]);
        }
        catch (error) {
            res.json(error);
        }
    },
    createDosis: async (req, res) => {
        const params = req.params.id;
        const newDosis = req.body;
        let keysProv = Object.keys(newDosis.dosis);
        let keys = keysProv.join(', ');
        const values = [params, ...Object.values(newDosis.dosis)];
        let placeholder = Object.keys(newDosis.dosis).map(() => '?').join(',');
        if (newDosis.otro) {
            keys = `${keys}, otro`;
            values.push(JSON.stringify(newDosis.otro));
            placeholder = `${placeholder},?`;
        }
        const query = `INSERT INTO _dosis (uuid,id_paciente, ${keys}) VALUES (UUID(),?,${placeholder})`;
        try {
            const result = await app_1.connectionSQL.pool.query(query, values);
            res.json(result[0]);
        }
        catch (error) {
            res.json(error);
        }
    },
    createAntecedentes: async (req, res) => {
        const params = req.params.id;
        const newAntecedentes = req.body;
        const query = `INSERT INTO _antecedentes (uuid,id_paciente, info_adicional) VALUES (UUID(),?,?)`;
        try {
            const result = await app_1.connectionSQL.pool.query(query, [params, JSON.stringify(newAntecedentes.ante)]);
            res.json(result[0]);
        }
        catch (error) {
            res.json(error);
        }
    }
};
