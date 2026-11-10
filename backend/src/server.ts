import "dotenv/config";
import app from "./app";
import { PORT } from "./constants";
import Logger from "./utils/logger.utils";
import dbConnection from "./db/config";
import { normalizeError } from "./helpers/response.helper";

function initServer() {
    try {
        app.listen(PORT, async () => {
            Logger.info('Iniciando servidor...');
            await dbConnection.sync({alter: true})
            Logger.success(`Escuchando puerto ${PORT}`);
        })   
    } catch (err) {
        Logger.error(`Ocurrio un error al iniciar el servidor: ${normalizeError(err)}`);
    }
}

initServer();
