import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Phil Dunphy",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -200,
  },
  {
    id: 933900,
    name: "Bruce Wayne",
    image: "https://i.pravatar.cc/48?u=933900",
    balance: 120,
  },
  {
    id: 499476,
    name: "Zach Galifianakis",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [showAddNew, setShowAddNew] = useState(false);
  const [people, setPeople] = useState(initialFriends);
  const [selected, setSelected] = useState(null);

  // Toggle show/hide add new person form
  function handleAddNew() {
    setShowAddNew((show) => !show);
    setSelected(null);
  }

  // Add a new person to the people list
  function handleAddPerson(person) {
    setPeople((people) => [...people, person]);
    setShowAddNew(false);
  }

  // Handle selecting a person from the list
  function handleSelection(person) {
    setSelected((curr) => (curr?.id === person.id ? null : person));
    setShowAddNew(false);
  }

  // Handle splitting the bill with the selected person
  function handleSplitBill(value) {
    console.log(value);
    setPeople((people) =>
      people.map((person) =>
        person.id === selected.id
          ? { ...person, balance: person.balance + value }
          : person
      )
    );
    setSelected(null); // Clear selected person after splitting the bill
  }

  return (
    <>
      <Header />
      <div className="app">
        <div className="sidebar">
          <PeopleList
            people={people}
            onSelection={handleSelection}
            selected={selected}
          />
          {showAddNew && <FormAddPerson onAddPerson={handleAddPerson} />}
          <Button onClick={handleAddNew}>
            {showAddNew ? "Close" : "Add New"}
          </Button>
        </div>
        {/* Form to split bill with selected person */}
        {selected && (
          <FormSplitBill selected={selected} onSplitBill={handleSplitBill} />
        )}
      </div>
      <Footer />
    </>
  );
}

// PeopleList component to display list of people
function PeopleList({ people, onSelection, selected }) {
  return (
    <ul>
      {people.map((person) => (
        <Person
          person={person}
          key={person.id}
          onSelection={onSelection}
          selected={selected}
        />
      ))}
    </ul>
  );
}

// Person component to display individual person details
function Person({ person, onSelection, selected }) {
  const isSelected = selected?.id === person.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={person.image} alt={person.name} />
      <h3>{person.name}</h3>
      {person.balance < 0 && (
        <p className="red">
          You owe {person.name} ${Math.abs(person.balance)}.
        </p>
      )}
      {person.balance > 0 && (
        <p className="green">
          {person.name} owes you ${person.balance}.
        </p>
      )}
      {person.balance === 0 && <p>You and {person.name} are settled up.</p>}

      <Button onClick={() => onSelection(person)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

// FormAddPerson component to add a new person to the list
function FormAddPerson({ onAddPerson }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  // Handle form submission to add a new person
  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID(); //Generate a unique ID for the new person
    const newPerson = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    onAddPerson(newPerson); // Call the parent function to add the new person
    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👫 Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>😎 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

// FormSplitBill component to split a bill with the selected person
function FormSplitBill({ selected, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByOther = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();
    if (!bill) return;
    onSplitBill(whoIsPaying === "user" ? paidByOther : -paidByUser);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selected.name}</h2>

      <label>💵 Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>🧍🏻‍♀️Your expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />

      <label>👫 {selected.name}'s expense</label>
      <input type="text" disabled value={paidByOther} />

      <label>🤑Who is paying the bill?</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="other">{selected.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}

function Footer() {
  return (
    <div className="footer">
      <p>~Made wholly for learning purposes~</p>
      <p className="copyright">
        &copy;{" "}
        <a className="name" href="https://chandanachakilam.netlify.app/">
          Chandana Chakilam@2024
        </a>
      </p>
    </div>
  );
}

function Header() {
  return (
    <header className="heading">
      <h1>SLICEMATE - The Bill Slicing Companion</h1>
    </header>
  );
}
