import { Router } from "express";

import { schemascustomers } from "../schemas/customersSchemas.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { delrentals, getrentals, postrentalsinit, postrentalsreturn } from "../controllers/rentalsController.js";


const rentalsRouter = Router()

rentalsRouter.get("/rentals", getrentals);
rentalsRouter.post("/rentals", postrentalsinit);
//rentalsRouter.post("/rentals/:id/return", validateSchema(schemascustomers), postrentalsreturn);
//rentalsRouter.delete("/rentals/:id", validateSchema(schemascustomers), delrentals);


export default rentalsRouter