import { Router } from "express";
import gamesRouter from "./gamesRoutes.js";
import customersRouter from "./customersRoutes.js";
import rentalsRouter from "./rentalsRoutes.js";


const router = Router()

router.use(gamesRouter)
router.use(customersRouter)
router.use(rentalsRouter)



export default router;