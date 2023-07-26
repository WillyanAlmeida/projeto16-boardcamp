import { Router } from "express";

import { validateSchema } from "../middlewares/validateSchema.js";
import {  schemasgames } from "../schemas/gamesSchemas.js";
import { getgames, postgames } from "../controllers/gamesController.js";


const gamesRouter = Router()


gamesRouter.post("/games", validateSchema(schemasgames), postgames);
gamesRouter.get("/games", getgames);



export default gamesRouter