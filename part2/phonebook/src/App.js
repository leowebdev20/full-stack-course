import { useState, useEffect } from "react";
import Server from "./Server";
import Persons from "./services/Persons";

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
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("Add name");
  const [newNumber, setNewNumber] = useState("Add Number");
  const [search, setSearch] = useState("");
  const [peopleToShow, setPeopleToShow] = useState(persons);

  const deletePost = (id) => {
    if (window.confirm("Are you sure?") === true) {
      Persons.cancel(id).then(() => {
        Persons.getAll().then((response) => {
          setPeopleToShow(response.data);
          setPersons(response.data);
        });
      });
    }
  };

  useEffect(() => {
    console.log("effect");
    Persons.getAll().then((response) => {
      setPeopleToShow(response.data);
      setPersons(response.data);
    });
  }, []);
  console.log("render", persons.length, "persons");

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      // id: persons.length + 1,
    };
    if (newName) {
      let isDouble = false;
      persons.forEach((person) => {
        if (JSON.stringify(personObject.name) === JSON.stringify(person.name)) {
          isDouble = true;
          window.confirm(
            `${personObject.name} name already inserted, want to update number?`
          );
          const updatedPerson = persons.find((n) => n.id === person.id);
          const changedNumber = { ...updatedPerson, number: personObject.number };
          Persons.update(person.id, changedNumber).then((response) => {
            console.log(response);

            Persons.getAll().then((response) => {
              setPeopleToShow(response.data);
              setPersons(response.data);
            });
          });
        }
      });
      if (!isDouble) {
        Persons.create(personObject).then((response) => {
          setPeopleToShow(persons.concat(response.data));
          setPersons(persons.concat(response.data));
          setNewName("");
          setNewNumber("");
          setSearch("");
        });
      }
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
    } else {
      setPeopleToShow(persons.filter(() => true));
    }
  };
  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleSearchChange = (event) => {
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
          <>
            <Person key={person.name} person={person} />
            <button key={person.id} onClick={() => deletePost(person.id)}>
              Delete
            </button>
          </>
        ))}
      </ul>
    </div>
  );
};

export default App;

// import { useState, useEffect } from "react";
// import Server from "./Server";
// import axios from "axios";

// const Person = ({ person }) => {
//   return (
//     <div>
//       <h3>
//         {person.name} - {person.number}
//       </h3>
//     </div>
//   );
// };

// const App = () => {
//   const [persons, setPersons] = useState([]);
//   const [newName, setNewName] = useState("Add name");
//   const [newNumber, setNewNumber] = useState("Add Number");
//   const [search, setSearch] = useState("Name...");
//   const [peopleToShow, setPeopleToShow] = useState(persons);

//   useEffect(() => {
//     console.log("effect");
//     axios.get("http://localhost:3001/persons").then((response) => {
//       console.log("promise fulfilled");
//       setPeopleToShow(response.data);
//       setPersons(response.data);
//     });
//   }, []);
//   console.log("render", persons.length, "persons");

//   const addPerson = (event) => {
//     event.preventDefault();
//     const personObject = {
//       name: newName,
//       number: newNumber,
//       id: persons.length + 1,
//     };
//     if (newName) {
//       persons.forEach((person) => {
//         if (JSON.stringify(personObject) === JSON.stringify(person)) {
//           alert(`${personObject.name} name already inserted`);
//         } else {
//           setPeopleToShow(persons.concat(personObject));
//           setPersons(persons.concat(personObject));
//           setNewName("");
//           setNewNumber("");
//           setSearch("");
//         }
//       });
//     }
//   };
//   const mySearch = (event) => {
//     event.preventDefault();
//     if (search) {
//       setPeopleToShow(
//         persons.filter((person) => {
//           return person.name.toLowerCase().indexOf(search.toLowerCase()) >= 0;
//         })
//       );
//       setSearch("");
//     } else {
//       setPeopleToShow(persons.filter(() => true));
//     }
//   };
//   const handlePersonChange = (event) => {
//     setNewName(event.target.value);
//   };
//   const handleNumChange = (event) => {
//     setNewNumber(event.target.value);
//   };
//   const handleSearchChange = (event) => {
//     setSearch(event.target.value);
//   };
//   return (
//     <div>
//       <h2>Phonebook</h2>
//       <Server />
//       <form onSubmit={mySearch}>
//         <div>
//           SEARCH: <input value={search} onChange={handleSearchChange} />
//           <button type="submit">add</button>
//         </div>
//       </form>
//       <form onSubmit={addPerson}>
//         <div>
//           name: <input value={newName} onChange={handlePersonChange} />
//           number: <input value={newNumber} onChange={handleNumChange} />
//           <button type="submit">add</button>
//         </div>
//       </form>
//       <h2>Numbers</h2>
//       <ul>
//         {peopleToShow.map((person) => (
//           <Person key={person.name} person={person} />
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default App;

// import { useState, useEffect } from "react";
// import Server from "./Server";
// import axios from "axios";

// const Person = ({ person }) => {
//   // console.log(person);
//   return (
//     <>
//       <div>
//         <h3>{person.name.common}</h3>
//         <h5>{person.capital}</h5>
//       </div>
//       <div>
//         <h5>{person.area}</h5>
//         <img src={person.flags.png} alt="" />
//       </div>
//     </>
//   );
// };
// const Persons = ({ person }) => {
//   // console.log(person);
//   return (
//     <div>
//       <h3>{person.name.common}</h3>
//     </div>
//   );
// };

// const App = () => {
//   const [persons, setPersons] = useState([]);
//   const [newName, setNewName] = useState("Add name");
//   const [newNumber, setNewNumber] = useState("Add Number");
//   const [search, setSearch] = useState("");
//   const [peopleToShow, setPeopleToShow] = useState(persons);

//   useEffect(() => {
//     console.log("effect");
//     axios.get("https://restcountries.com/v3.1/all").then((response) => {
//       console.log("promise fulfilled", response.data);
//       setPeopleToShow(
//         response.data.filter((person) => {
//           return (
//             person.name.common.toLowerCase().indexOf(search.toLowerCase()) >= 0
//           );
//         })
//       );
//       // setPeopleToShow(response.data);
//       // setPersons(response.data);
//     });
//   }, [search]);
//   console.log("render", persons.length, "persons");

//   const addPerson = (event) => {
//     event.preventDefault();
//     const personObject = {
//       name: newName,
//       number: newNumber,
//       id: persons.length + 1,
//     };
//     if (newName) {
//       persons.forEach((person) => {
//         if (JSON.stringify(personObject) === JSON.stringify(person)) {
//           alert(`${personObject.name} name already inserted`);
//         } else {
//           setPeopleToShow(persons.concat(personObject));
//           setPersons(persons.concat(personObject));
//           setNewName("");
//           setNewNumber("");
//           setSearch("");
//         }
//       });
//     }
//   };
//   const mySearch = (event) => {
//     event.preventDefault();
//     if (search) {
//       setPeopleToShow(
//         persons.filter((person) => {
//           return (
//             person.name.common.toLowerCase().indexOf(search.toLowerCase()) >= 0
//           );
//         })
//       );
//       setSearch("");
//     } else {
//       setPeopleToShow(persons.filter(() => true));
//     }
//   };
//   // const handlePersonChange = (event) => {
//   //   setNewName(event.target.value);
//   // };
//   // const handleNumChange = (event) => {
//   //   setNewNumber(event.target.value);
//   // };
//   const handleSearchChange = (event) => {
//     setSearch(event.target.value);
//   };
//   return (
//     <div>
//       <h2>Countries</h2>
//       <Server />
//       <form onSubmit={mySearch}>
//         <div>
//           SEARCH: <input value={search} onChange={handleSearchChange} />
//           <button type="submit">add</button>
//         </div>
//       </form>
//       {/* <form onSubmit={addPerson}>
//         <div>
//           name: <input value={newName} onChange={handlePersonChange} />
//           number: <input value={newNumber} onChange={handleNumChange} />
//           <button type="submit">add</button>
//         </div>
//       </form>
//       <h2>Numbers</h2> */}
//       <ul>
//         {peopleToShow.length > 10
//           ? "Too many matches!"
//           : peopleToShow.length > 1
//           ? peopleToShow.map((person) => (
//               <Persons key={person.name.common} person={person} />
//             ))
//           : peopleToShow.map((person) => (
//               <Person key={person.name.common} person={person} />
//             ))}
//       </ul>
//     </div>
//   );
// };

// export default App;
