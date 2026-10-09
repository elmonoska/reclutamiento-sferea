import express from "express";
import morgan from "morgan";

const app = express();

// respuestas en json
app.use(express.json());

// logs
app.use(morgan('dev'));

export default app;
