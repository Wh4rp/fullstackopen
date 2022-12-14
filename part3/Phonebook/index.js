require("dotenv").config()
const express = require("express")
const app = express()
const Person = require("./models/person")

const cors = require("cors")

app.use(cors())

const morgan = require("morgan")

morgan.token("data", function (req, res) { return JSON.stringify(req.body) })

app.use(express.json())

const logger = morgan(":method :url :status :res[content-length] - :response-time ms :data")
app.use(logger)

app.use(express.static("build"))

app.get("/api/persons", (req, res) => {
	Person.find({})
		.then(persons => {
			res.json(persons)
		})
})

app.post("/api/persons", (req, res, next) => {
	const body = req.body

	const newPerson = new Person({
		name: body.name,
		number: body.number,
	})

	newPerson.save()
		.then(savedPerson => {
			res.json(savedPerson)
		})
		.catch(error => next(error))
})

app.get("/api/persons/:id", (req, res, next) => {
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

app.delete("/api/persons/:id", (req, res, next) => {
	Person.findByIdAndRemove(req.params.id)
		.then(res => {
			res.status(204).end()
		})
		.catch(error => next(error))
})

app.put("/api/persons/:id", (req, res, next) => {
	const body = req.body

	const person = {
		name: body.name,
		number: body.number,
	}

	Person.findByIdAndUpdate(
		req.params.id,
		person,
		{ new: true, runValidators: true, context: "query" }
	)
		.then(updatedNote => {
			res.json(updatedNote)
		})
		.catch(error => next(error))
})

app.get("/info", (req, res) => {
	Person.find({})
		.then(persons => {
			res.send(`<p>Phonebook has info for ${persons.length} people</p>
			<p>${new Date()}</p>`)
		})
})

const errorHandler = (error, req, res, next) => {
	console.error(error.message)

	if (error.name === "CastError") {
		return res.status(400).send({ error: "malformatted id" })
	}
	else if (error.name === "ValidationError") {
		return res.status(400).json({ error: error.message })
	}

	next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})