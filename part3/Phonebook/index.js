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
                number: body.number,
            })

            newPerson.save()
                .then(savedPerson => {
                    res.json(savedPerson)
                })
        })
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person)
            }
            else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedNote => {
            res.json(updatedNote)
        })
        .catch(error => next(error))
})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} person</p><p>${new Date()}</p>`)
})

const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})