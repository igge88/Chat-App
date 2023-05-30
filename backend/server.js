import { config } from 'dotenv'
import pkg from 'pg'

const { Client } = pkg

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import bcrypt from 'bcrypt'
import { v4 as uuidv4, validate as uuidValidate } from 'uuid'

const generateUserId = () => {
    const userId = uuidv4()
    return userId
}

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

client.connect(function (err) {
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
        const result = await client.query('SELECT * FROM users')
        res.json(result.rows)
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
})

// Users POST
app.post('/users/create-account', async (req, res) => {
    const { username, password } = req.body
    try {
        await client.query(
            'INSERT INTO users (username, password) VALUES ($1, $2)',
            [username, password]
        )
        res.sendStatus(201)
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
})

// Endpoint to retrieve all messages
app.get('/messages', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM messages')
        res.json(result.rows)
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
})

// Endpoint to create a new conversation
app.post('/conversations', async (req, res) => {
    try {
        const { participant1_id, participant2_id } = req.body

        // Insert the conversation into the database
        const query =
            'INSERT INTO conversations (participant1_id, participant2_id) VALUES ($1, $2) RETURNING id'
        const result = await client.query(query, [
            participant1_id,
            participant2_id
        ])

        const conversationId = result.rows[0].id

        res.status(201).json({
            message: 'Conversation created successfully',
            conversationId
        })
    } catch (error) {
        console.error('Error creating conversation', error)
        res.status(500).json({
            error: 'An error occurred while creating conversation'
        })
    }
})

// Endpoint to create a new message
app.post('/messages', async (req, res) => {
    const { message_id, sender_id, content } = req.body
    try {
        await client.query(
            'INSERT INTO messages (message_id, sender_id, content) VALUES ($1, $2, $3)',
            [message_id, sender_id, content]
        )
        res.sendStatus(201)
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
})

// API endpoint to delete a message by ID
app.delete('/messages/:id', async (req, res) => {
    const id = req.params.id
    try {
        await client.query('DELETE FROM messages WHERE id = $1', [id])
        res.sendStatus(200)
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
})

// Registration endpoint
app.post('/register', async (req, res) => {
    const { username, password } = req.body

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        // Insert the user into the database
        const query = 'INSERT INTO users (username, password) VALUES ($1, $2)'
        await client.query(query, [username, hashedPassword])

        res.status(201).json({ message: 'User registered successfully' })
    } catch (error) {
        console.error('Error registering user', error)
        res.status(500).json({
            error: 'An error occurred while registering user'
        })
    }
})

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body

    try {
        // Retrieve the user from the database
        const query = 'SELECT * FROM users WHERE username = $1'
        const result = await client.query(query, [username])

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }

        // Compare the provided password with the stored hashed password
        const user = result.rows[0]
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }

        // Generate a unique userId for the user
        const userId = generateUserId()

        res.json({ message: 'Login successful', user: { userId } })
    } catch (error) {
        console.error('Error logging in user', error)
        res.status(500).json({
            error: 'An error occurred while logging in user'
        })
    }
})

// Middleware to verify user authentication
const authenticateUser = (req, res, next) => {
    // Check if user is authenticated (e.g., by verifying session, token, etc.)
    // For simplicity, we'll assume a user is authenticated if the request contains a valid user object

    if (!req.body.user) {
        return res.status(401).json({ error: 'Unauthenticated' })
    }

    next()
}

app.get('/conversations', authenticateUser, async (req, res) => {
    const { userId } = req.body.user

    // Validate the userId
    if (!uuidValidate(userId)) {
        return res.status(400).json({ error: 'Invalid userId' })
    }

    try {
        // Retrieve conversations for the user from the database
        const query = `
        SELECT c.id, u.username AS participant_username
        FROM conversations AS c
        INNER JOIN users AS u ON (u.id = CASE WHEN c.participant1_id = $1 THEN c.participant2_id ELSE c.participant1_id END)
        WHERE c.participant1_id = $1 OR c.participant2_id = $1
      `
        const result = await client.query(query, [userId])

        res.json(result.rows)
    } catch (error) {
        console.error('Error fetching conversations', error)
        res.status(500).json({
            error: 'An error occurred while fetching conversations'
        })
    }
})

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err)
    res.status(500).json({ error: 'Internal server error' })
})

app.listen(8800, () => {
    console.log('Server is running')
})
