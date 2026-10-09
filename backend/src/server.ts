import "dotenv/config";
import app from "./app";
import { PORT } from "./constants";
import Logger from "./utiles/Logger";
import { connectDB } from "./db/config";

async function initServer() {
    try {
        app.listen(PORT, async () => {
            Logger.info('Iniciando servidor...');
            await connectDB()
            Logger.success(`Escuchando puerto ${PORT}`);
        })   
    } catch (err) {
        Logger.error(`Ocurrio un error al iniciar el servidor: ${err.message}`);
    }
}

initServer();
