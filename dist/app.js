"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = exports.connectionSQL = void 0;
const express_1 = __importDefault(require("express"));
const database_1 = require("./database");
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
//IMPORTANDO RUTAS ESTABLECIDAS
const index_routes_1 = __importDefault(require("./routes/index.routes"));
exports.connectionSQL = new database_1.conectionMySql();
class App {
    app;
    ipHabilitada;
    pool;
    constructor() {
        this.ipHabilitada = {
            "clinica": "http://190.121.150.213"
        };
        this.app = (0, express_1.default)();
        this.app.set('port', 4100);
        this.middlewares();
        this.routes();
        this.pool = exports.connectionSQL.pool;
    }
    corsOpcion = {
        origin: (origin, callback) => {
            if (origin === this.ipHabilitada.clinica) {
                callback(null, true);
            }
            else {
                callback(new Error('Not allowed by Cors'));
            }
        }
    };
    middlewares() {
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)(this.corsOpcion));
    }
    routes() {
        this.app.get('/', (req, res) => {
            res.json("SERVIDOR ALOJAMIENTO DE DATOS BIOIMPEDANCIA");
        });
        this.app.use('/31415927182832148686260093ulrserverforcrudbioimpedanciometria', index_routes_1.default);
    }
    async connectionMysql() {
        console.log("Iniciando conexion a base de datos");
        const checkConnection = await exports.connectionSQL.check();
        if (checkConnection) {
            console.log("Conexion a base de datos establecida");
        }
        else {
            console.error("Error en la conexion en la base de datos");
        }
    }
    async init() {
        return new Promise((resolve, reject) => {
            this.app.listen(this.app.get('port'), () => {
                console.log("");
                console.log("\x1b[33m%s\x1b[0m", `|-----| SERVER ON PORT ${this.app.get('port')} |-----|`);
                console.log("");
                this.connectionMysql();
            }).on('error', (err) => reject(err));
        });
    }
}
exports.App = App;
