import Person from "./Person";
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

export default PeopleList;
