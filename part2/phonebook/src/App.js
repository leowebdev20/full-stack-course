import { useState } from "react";

const Person = ({ person }) => {
  return (
    <div>
      <h3>
        {person.name} - {person.number}
      </h3>
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("Add name");
  const [newNumber, setNewNumber] = useState("Add Number");
  const [search, setSearch] = useState("Name...");
  const [peopleToShow, setPeopleToShow] = useState(persons);

  // const peopleToShow = persons.filter((person) => person.name === true);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    if (newName) {
      persons.forEach((person) => {
        if (JSON.stringify(personObject) === JSON.stringify(person)) {
          alert(`${personObject.name} name already inserted`);
        } else {
          setPeopleToShow(persons.concat(personObject));
          setPersons(persons.concat(personObject));
          setNewName("");
          setNewNumber("");
          setSearch("");
        }
      });
    }
  };
  const mySearch = (event) => {
    event.preventDefault();
    if (search) {
      setPeopleToShow(
        persons.filter((person) => {
          return person.name.toLowerCase().indexOf(search.toLowerCase()) >= 0;
        })
      );
      setSearch("");
    }
  };
  const handlePersonChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleNumChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };
  const handleSearchChange = (event) => {
    console.log(event.target.value);
    setSearch(event.target.value);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={mySearch}>
        <div>
          SEARCH: <input value={search} onChange={handleSearchChange} />
          <button type="submit">add</button>
        </div>
      </form>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
          number: <input value={newNumber} onChange={handleNumChange} />
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {peopleToShow.map((person) => (
          <Person key={person.name} person={person} />
        ))}
      </ul>
    </div>
  );
};

export default App;
