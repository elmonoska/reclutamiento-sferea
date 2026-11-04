import { Router } from "express";
import authRouter from "./Auth.routes";

const router = Router();

router.use('/auth', authRouter);

export default router;
