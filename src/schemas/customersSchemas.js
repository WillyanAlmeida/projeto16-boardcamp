import joi from "joi";

const now = Date.now()
const maxDate = new Date(now - (1000 * 60 * 60 * 24 * 365 * 18))

export const schemascustomers = joi.object({
    name: joi.string().required(),
    phone: joi.string().min(10).max(11).pattern(/^[0-9]+$/).required(),
    cpf: joi.string().length(11).pattern(/^[0-9]+$/).required(),
    birthday: joi.date().max(maxDate).required(),
})

