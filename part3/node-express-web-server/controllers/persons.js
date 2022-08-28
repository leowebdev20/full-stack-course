const personsRouter = require('express').Router()
const person = require('../models/person')

personsRouter.get('/', (request, response) => {
  person.find({}).then(persons => {
    response.json(persons)
  })
})

personsRouter.get('/:id', (request, response, next) => {
  person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

personsRouter.post('/', (request, response, next) => {
  const body = request.body

  const person = new person({
    name: body.name,
    number: body.number || "",
  })

  person.save()
    .then(savedperson => {
      response.json(savedperson)
    })
    .catch(error => next(error))
})

personsRouter.delete('/:id', (request, response, next) => {
  person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

personsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const person = { 
    name: body.name,
    number: body.number,
  }

  person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedperson => {
      response.json(updatedperson)
    })
    .catch(error => next(error))
})

module.exports = personsRouter