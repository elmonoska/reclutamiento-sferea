import "dotenv/config";
import 'reflect-metadata';
import app from "./app";
import { PORT } from "./constants";
import Logger from "./utils/Logger";
import dbConnection from "./db/config";

function initServer() {
    try {
        app.listen(PORT, async () => {
            Logger.info('Iniciando servidor...');
            await dbConnection.sync({alter: true})
            Logger.success(`Escuchando puerto ${PORT}`);
        })   
    } catch (err) {
        Logger.error(`Ocurrio un error al iniciar el servidor: ${err.message}`);
    }
}

initServer();
