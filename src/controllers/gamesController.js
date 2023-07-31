
import { db } from "../database/databaseconnections.js";


export async function getgames(req, res) {
    try {
        const games = await db.query(`SELECT * FROM games`);
        res.send(games.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function postgames(req, res) {
    const { name, image, stockTotal, pricePerDay } = req.body

    try {
        const games = await db.query(`SELECT * FROM games WHERE name=$1`, [name]);
        if (games.rows.length > 0) return res.sendStatus(409)

        const creatgames = await db.query(`INSERT INTO games ( name, image, "stockTotal", "pricePerDay") VALUES
        ($1, $2, $3, $4)`, [name, image, stockTotal, pricePerDay]);
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}
