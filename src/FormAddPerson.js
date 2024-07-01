import Button from "./Button";
import { useState } from "react";

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

export default FormAddPerson;
