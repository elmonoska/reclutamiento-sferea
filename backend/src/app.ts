import express from "express";
import morgan from "morgan";
import router from "./routes/index.routes";
import cors from 'cors';
import { corsOptions } from "./config/cors";

const app = express();

// respuestas en json
app.use(express.json());

// logs
app.use(morgan('dev'));

// configuracion de cors
app.use(cors(corsOptions));

// rutas de la api
app.use('/api', router);

export default app;
