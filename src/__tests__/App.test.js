import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../components/App";
import initialFriends from "../components/data";

describe("App Component", () => {
  jest.mock("crypto", () => ({
    randomUUID: () => "mock-uuid-" + new Date().getTime(),
  }));

  test("renders header", () => {
    render(<App />);
    const headerElement = screen.getByText(
      /SLICEMATE - The Bill Slicing Companion/i
    );
    expect(headerElement).toBeInTheDocument();
  });

  test("shows add person form when 'Add New' is clicked", () => {
    render(<App />);

    const addButton = screen.getByText("Add New");
    fireEvent.click(addButton);

    const formElement = screen.getByText("Name");
    expect(formElement).toBeInTheDocument();
  });

  //   test("adds a person when 'Add' button is clicked", async () => {
  //     render(<App />);

  //     const addButton = screen.getByText("Add New");
  //     fireEvent.click(addButton);

  //     const nameInput = screen.getByLabelText("Name");
  //     fireEvent.change(nameInput, { target: { value: "Person" } });

  //     const submitButton = screen.getByText("Add");
  //     fireEvent.click(submitButton);
  //     await waitFor(
  //       () => {
  //         const newPerson = screen.getByText(/Person/i); // Using RegExp for flexibility
  //         console.log(newPerson); // Log the found element for debugging
  //         expect(newPerson).toBeInTheDocument();
  //       },
  //       { timeout: 4000 }
  //     ); // Increase timeout if necessary
  //   });
});
