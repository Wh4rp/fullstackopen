require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')

const cors = require('cors')

app.use(cors())

const morgan = require('morgan')

morgan.token('data', function (req, res) { return JSON.stringify(req.body) })

app.use(express.json())

const logger = morgan(':method :url :status :res[content-length] - :response-time ms :data')
app.use(logger)

app.use(express.static('build'))

const generateId = () => {
    return Math.floor(Math.random() * 1000000)
}

app.get('/api/persons', (req, res) => {
    Person.find({})
        .then(persons => {
            res.json(persons)
        })
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name) {
        return res.status(400).json({
            error: 'name missing'
        })
    }

    if (!body.number) {
        return res.status(400).json({
            error: 'number missing'
        })
    }

    Person.find({ name: body.name })
        .then(result => {
            if (result.length > 0) {
                return res.status(400).json({
                    error: 'name must be unique'
                })
            }
            const newPerson = new Person({
                name: body.name,
                number: body.number || 0,
            })

            newPerson.save()
                .then(savedPerson => {
                    res.json(savedPerson)
                })
        })
})

app.get('/api/persons/:id', (req, res) => {
    Person.findById(request.params.id)
        .then(person => {
            response.json(person)
        })
        .catch(error => {
            res.status(404).end()
        })
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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})