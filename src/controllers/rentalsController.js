import dayjs from "dayjs";
import { db } from "../database/databaseconnections.js";


 export async function getrentals(req, res) {

     try {
         const rentalslist = await db.query(`SELECT rentals.*, 
         TO_CHAR(rentals."rentDate", 'YYYY-MM-DD') AS "rentDate",
         TO_CHAR(rentals."returnDate", 'YYYY-MM-DD') AS "returnDate", 
         customers."name" as "customerName", 
         games."name" as "gameName"
         FROM rentals
         JOIN customers ON rentals."customerId" = customers."id" 
         JOIN games ON rentals."gameId" = games."id"`);



         const rentals = rentalslist.rows.map((rental) => {  return {  
            id: rental.id,
            customerId: rental.customerId,
            gameId: rental.gameId,
            rentDate: rental.rentDate,
            daysRented: rental.daysRented,
            returnDate: rental.returnDate,
            originalPrice: rental.originalPrice,
            delayFee: rental.delayFee,
            customer: {
              id: rental.customerId,
              name: rental.customerName,
            },
            game: {
              id: rental.gameId,
              name: rental.gameName,
            },
          }});

         res.send(rentals);
     } catch (err) {
         res.status(500).send(err.message);
     }
 }


export async function postrentalsinit(req, res) {
    const { customerId, gameId, daysRented } = req.body

    if (daysRented < 1) return res.sendStatus(400)

    try {
        const checkcustomer = await db.query(`SELECT * FROM customers WHERE id=$1`, [customerId]);
        const checkgame = await db.query(`SELECT * FROM games WHERE id=$1`, [gameId]);

        if (checkcustomer.rows.length === 0) return res.sendStatus(400)
        if (checkgame.rows.length === 0) return res.sendStatus(400)
        if (checkgame?.rows[0]?.stockTotal===0) return res.sendStatus(400)   
        
        const countstock = await db.query(`SELECT COUNT(*) AS openrentals FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL;`, [gameId]);
        
        console.log(checkgame.rows[0].stockTotal-countstock.rows[0].openrentals)
        if((checkgame.rows[0].stockTotal-countstock.rows[0].openrentals)===0) return res.sendStatus(400)

        const originalPrice = daysRented * checkgame.rows[0].pricePerDay;
        const returnDate = null;
        const delayFee = null;                                       
        const rentDate = dayjs().format('YYYY-MM-DD')

        await db.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee]);

         res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function postrentalsreturn(req, res) {
    const { name, phone, cpf, birthday } = req.body

    try {
        const customers = await db.query(`SELECT * FROM customers WHERE cpf=$1`, [cpf]);

        if (customers.rows.length > 0) return res.sendStatus(409)

        await db.query(`INSERT INTO customers ( name, phone, cpf, birthday) VALUES
        ($1, $2, $3, $4)`, [name, phone, cpf, birthday]);
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function delrentals(req, res) {
    const { name, phone, cpf, birthday } = req.body
    const { id } = req.params
    console.log(cpf)
    try {
        const customers = await db.query(`SELECT * FROM customers WHERE id=$1`, [id]);

        if (customers.rows.length === 0) return res.sendStatus(404)
        const checkcpf = await db.query(`SELECT * FROM customers WHERE cpf=$1 AND id<>$2 `, [cpf, id]);
        if (checkcpf.rows.length > 0) return res.sendStatus(409)

        const creatgames = await db.query(`UPDATE customers SET  name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5`, [name, phone, cpf, birthday, id]);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err.message);
    }
}