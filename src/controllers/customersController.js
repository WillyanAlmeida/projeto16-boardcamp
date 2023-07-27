import { db } from "../database/databaseconnections.js";


export async function getcustomers(req, res) {
    try {
        const customerslist = await db.query(`SELECT id, name, phone, cpf, TO_CHAR(birthday, 'YYYY-MM-DD') AS birthday FROM customers ` );
        res.send(customerslist.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getcustomersbyid(req, res) {
    const { id }= req.params
    try {
        const customer = await db.query(`SELECT id, name, phone, cpf, TO_CHAR(birthday, 'YYYY-MM-DD') AS birthday FROM customers  WHERE id=$1;`, [id]);
        if(customer.rows.length<1) return res.sendStatus(404)
        res.send(customer.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function postcustomers(req, res) {
    const { name, phone, cpf, birthday } = req.body

    try {
        const customers = await db.query(`SELECT * FROM customers WHERE cpf=$1`,[cpf]);

        if(customers.rows.length>0) return res.sendStatus(409)
       
        await db.query(`INSERT INTO customers ( name, phone, cpf, birthday) VALUES
        ($1, $2, $3, $4)`,[name, phone, cpf, birthday]);
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function putcustomers(req, res) {
    const {  name, phone, cpf, birthday } = req.body
    const { id }= req.params

    try {
        const customers = await db.query(`SELECT * FROM customers WHERE cpf=$1`,[cpf]);

        if(customers.rows.cpf !=id) return res.sendStatus(409)        
       
        const creatgames = await db.query(`INSERT INTO games (  name, phone, cpf, birthday) VALUES
        ($1, $2, $3, $4)`,[ name, phone, cpf, birthday]);
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}