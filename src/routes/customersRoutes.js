import { Router } from "express";


import { getcustomers, getcustomersbyid, postcustomers, putcustomers } from "../controllers/customersController.js";
import { schemascustomers } from "../schemas/customersSchemas.js";
import { validateSchema } from "../middlewares/validateSchema.js";


const customersRouter = Router()

customersRouter.get("/customers", getcustomers);
customersRouter.get("/customers/:id", getcustomersbyid);
customersRouter.post("/customers", validateSchema(schemascustomers), postcustomers);
customersRouter.put("/customers/:id", validateSchema(schemascustomers), putcustomers);


export default customersRouter