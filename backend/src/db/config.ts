import { ConnectionOptions, Sequelize } from "sequelize";
import { DB_URL } from "./constants";
import { PostgresDialect } from "@sequelize/postgres";
import Logger from "../utiles/Logger";

const connectionOptions = {
    dialect: PostgresDialect
}

export async function connectDB() {
    try {
        const connection = new Sequelize(DB_URL, connectionOptions)
        Logger.info('Iniciando conexion a bd');
        await connection.authenticate();
        Logger.success('Conexion a bd exitosa');
    } catch (err) {
        Logger.error(`Ocurrio un error al conectar con la bd ${err.message}`);
    }
}
