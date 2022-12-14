require("dotenv").config();

const express = require("express");
var morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");
const mongoose = require("mongoose");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("build"));

app.get("/", function (req, res) {
  //   console.log('Method:', req.method)
  //   console.log('Path:  ', req.path)
  //   console.log('Body:  ', req.body)
  res.send("hello, world!");
});
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :req[content] :res[content]"
  )
);

const url = process.env.MONGODB_URI;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// const Person = mongoose.model("Person", personSchema);

const generateId = () => {
  return Math.floor(Math.random() * 1000);
};

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  //   const person = persons.find((person) => person.id === id);

  //   if (person) {
  //     response.json(person);
  //   } else {
  //     response.status(404).end();
  //   }

  Person.findById(id).then((person) => {
    response.json(person);
  });
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: "name missing",
    });
  }

  console.log("body", body);
 
  const person = new Person({
    name: body.name,
    number: body.number || "0",
    // id: generateId(),
  });

  console.log(person, "!!!");

  //   persons = persons.concat(person);
  // response.json(person);

  person.save().then((savedPerson) => {
    console.log(savedPerson, "savedPerson");
    response.json(savedPerson);
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
