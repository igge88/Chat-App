import { config } from "dotenv";
import pkg from 'pg';

const {Client} = pkg;

import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";

const app = express()
//Dotenv
config()

//Middlewares
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.use(cors())
app.use(express.json())
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

//Implementerar Databasen

const client = new Client({
    database: process.env.DATABASE,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    port: process.env.PORT,
    user: process.env.USER
})

client.connect(function (err){
    if (err) throw err
    console.log('Database Connected')
})

//Rutterna
app.get('/', (req, res) => {
    res.json('Svejsan')
})

app.get('/users', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM Users');
        res.json(result.rows);
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
})

//Users Post
app.post('/users/create-account', async (req, res) => {
    const { FirstName, LastName, email, password } = req.body
    try {
        await client.query(
            'INSERT INTO users (FirstName, LastName, email, password) VALUES ($1, $2, $3, $4)',
            [FirstName, LastName, email, password]
        )
        res.sendStatus(201)
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
})


app.listen(8800, () => {
    console.log('Server is running')
})
