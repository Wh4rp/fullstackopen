const express = require('express')
const app = express()

const morgan = require('morgan')

morgan.token('data', function (req, res) { return JSON.stringify(req.body) })

app.use(express.json())

const logger = morgan(':method :url :status :res[content-length] - :response-time ms :data')
app.use(logger)

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

const generateId = () => {
    return Math.floor(Math.random() * 1000000)
}

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    console.log('body', body)

    if (!body.name) {
        return res.status(400).json({
            error: 'name missing'
        })
    }

    const isNameUnique = persons.find(person => person.name === body.name)

    if (isNameUnique) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    const newPerson = {
        name: body.name,
        number: body.number || 0,
        id: generateId()
    }

    persons = persons.concat(newPerson)

    res.json(newPerson)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        res.json(person)
    }
    else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        persons = persons.filter(p => p.id !== id)
        res.status(204).end()
    }
    else {
        res.status(404).end()
    }
})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} person</p><p>${new Date()}</p>`)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})