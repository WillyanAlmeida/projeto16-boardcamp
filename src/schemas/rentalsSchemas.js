import joi from "joi";

export const schemarentals = joi.object({
    customerId: joi.number().min(1).required(),
    gameId: joi.number().min(1).required(),
    daysRented: joi.number().min(1).required(),
})