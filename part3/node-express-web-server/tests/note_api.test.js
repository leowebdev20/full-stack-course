const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const person = require('../models/person')

beforeEach(async () => {
  await person.deleteMany({})
  await person.insertMany(helper.initialpersons)
})

describe('when there is initially some persons saved', () => {
  test('persons are returned as json', async () => {
    await api
      .get('/api/persons')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all persons are returned', async () => {
    const response = await api.get('/api/persons')

    expect(response.body).toHaveLength(helper.initialpersons.length)
  })

  test('a specific person is within the returned persons', async () => {
    const response = await api.get('/api/persons')

    const contents = response.body.map(r => r.content)

    expect(contents).toContain(
      'Browser can execute only Javascript'
    )
  })
})

describe('viewing a specific person', () => {
  test('succeeds with a valid id', async () => {
    const personsAtStart = await helper.personsInDb()

    const personToView = personsAtStart[0]

    const resultperson = await api
      .get(`/api/persons/${personToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
      
    const processedpersonToView = JSON.parse(JSON.stringify(personToView))

    expect(resultperson.body).toEqual(processedpersonToView)
  })

  test('fails with statuscode 404 if person does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    console.log(validNonexistingId)

    await api
      .get(`/api/persons/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/persons/${invalidId}`)
      .expect(400)
  })
})

describe('addition of a new person', () => {
  test('succeeds with valid data', async () => {
    const newperson = {
      name: 'TEST',
      number: "43432",
    }

    await api
      .post('/api/persons')
      .send(newperson)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const personsAtEnd = await helper.personsInDb()
    expect(personsAtEnd).toHaveLength(helper.initialpersons.length + 1)

    const contents = personsAtEnd.map(n => n.content)
    expect(contents).toContain(
      'async/await simplifies making async calls'
    )
  })

  test('fails with status code 400 if data invalid', async () => {
    const newperson = {
        number: "435352"
    }

    await api
      .post('/api/persons')
      .send(newperson)
      .expect(400)

    const personsAtEnd = await helper.personsInDb()

    expect(personsAtEnd).toHaveLength(helper.initialpersons.length)
  })
})

describe('deletion of a person', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const personsAtStart = await helper.personsInDb()
    const personToDelete = personsAtStart[0]

    await api
      .delete(`/api/persons/${personToDelete.id}`)
      .expect(204)

    const personsAtEnd = await helper.personsInDb()

    expect(personsAtEnd).toHaveLength(
      helper.initialpersons.length - 1
    )

    const contents = personsAtEnd.map(r => r.content)

    expect(contents).not.toContain(personToDelete.content)
  })
})

afterAll(() => {
  mongoose.connection.close()
})