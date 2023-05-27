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

//Implementing the Database

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

// Routes
app.get('/', (req, res) => {
    res.json('Svejsan')
})

//Users GET
app.get('/users', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
})

// Users POST
app.post('/users/create-account', async (req, res) => {
    const { FirstName, LastName, email, password } = req.body
    try {
        await client.query(
            'INSERT INTO users (FirstName, LastName, email, password) VALUES ($1, $2, $3, $4)',
            [FirstName, LastName, email, password]
            );
        res.sendStatus(201)
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
})

// API endpoint to retrieve all messages
app.get('/api/messages', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM messages');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

// API endpoint to create a new message
app.post('/api/messages', async (req, res) => {
    const { sender_id, recipient_id, messagetext } = req.body;
    try {
        await client.query('INSERT INTO messages (sender_id, recipient_id, messagetext) VALUES ($1, $2, $3)',
        [sender_id, recipient_id, messagetext]
        );
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

// API endpoint to delete a message by ID
app.delete('/api/messages/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await client.query('DELETE FROM messages WHERE id = $1',
        [id]
        );
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
})


app.listen(8800, () => {
    console.log('Server is running')
})
