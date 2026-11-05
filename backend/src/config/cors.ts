import { CorsOptions } from "cors";
import { FRONTEND_URL, NODE_ENV } from "../constants";

export const corsOptions: CorsOptions = {
    origin: function(origin, callback) {
        if (NODE_ENV === 'development') {
            return callback(null, true)
        }
        
        const whiteList = [FRONTEND_URL];
        if (!origin && whiteList.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Error de CORS: Origen no permitido'));
        }
    },
    credentials: true
}