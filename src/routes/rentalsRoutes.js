import { Router } from "express";

import { validateSchema } from "../middlewares/validateSchema.js";
import { delrentals, getrentals, postrentalsinit, postrentalsreturn } from "../controllers/rentalsController.js";
import { schemarentals } from "../schemas/rentalsSchemas.js";


const rentalsRouter = Router()

rentalsRouter.get("/rentals", getrentals);
rentalsRouter.post("/rentals", validateSchema(schemarentals), postrentalsinit);
//rentalsRouter.post("/rentals/:id/return", validateSchema(schemascustomers), postrentalsreturn);
rentalsRouter.delete("/rentals/:id", delrentals);


export default rentalsRouter