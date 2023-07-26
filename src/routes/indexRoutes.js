import { Router } from "express";
import gamesRouter from "./gamesRoutes.js";


const router = Router()

router.use(gamesRouter)



export default router;