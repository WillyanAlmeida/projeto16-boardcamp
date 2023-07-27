import { Router } from "express";
import gamesRouter from "./gamesRoutes.js";
import customersRouter from "./customersRoutes.js";


const router = Router()

router.use(gamesRouter)
router.use(customersRouter)



export default router;