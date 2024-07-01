import { useState } from "react";
import Button from "./Button";
import PeopleList from "./PeopleList";
import Header from "./Header";
import FormAddPerson from "./FormAddPerson";
import FormSplitBill from "./FormSplitBill";
import Footer from "./Footer";
import initialFriends from "./data";

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
