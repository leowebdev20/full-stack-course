const Person = require("../models/person");

const initialPersons = [
  {
    name: "HTML is easy",
    number: "000",
  },
  {
    name: "CSS is hard",
    number: "111",
  },
];

const nonExistingId = async () => {
  const person = new Person({
    content: "willremovethissoon",
    date: new Date(),
  });
  await person.save();
  await person.remove();

  return person._id.toString();
};

const personsInDb = async () => {
  const persons = await Person.find({});
  return persons.map((person) => person.toJSON());
};

module.exports = {
  initialPersons,
  nonExistingId,
  personsInDb,
};
