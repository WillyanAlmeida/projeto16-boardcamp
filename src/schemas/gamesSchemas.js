import joi from "joi"

export const schemasgames = joi.object({
    name: joi.string().required(),
    image: joi.string().uri().required(),
    stockTotal: joi.number().min(1).required(),
    pricePerDay: joi.number().min(1).required(),
})
