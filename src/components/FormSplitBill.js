import Button from "./Button";
import { useState } from "react";

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

export default FormSplitBill;
