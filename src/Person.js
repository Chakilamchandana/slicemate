import Button from "./Button";

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

export default Person;
