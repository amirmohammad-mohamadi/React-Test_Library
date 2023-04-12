import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import UserForm from "./UserForm";

test("it shows two inputs and a butoon", () => {
  render(<UserForm />);

  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");

  // see all roles => https://www.w3.org/TR/html-aria/#docconformance
  // see all matches => https://github.com/testing-library/jest-dom#custom-matchers

  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

test("it calls onUserAdd when the form is submitted", () => {
  const mock = jest.fn();
  render(<UserForm onUserAdd={mock} />);

  const nameInput = screen.getByRole("textbox", {
    name: /name/i,
  });

  const emailInput = screen.getByRole("textbox", {
    name: /email/i,
  });

  user.click(nameInput);
  user.keyboard("amir");

  user.click(emailInput);
  user.keyboard("amir@test.com");

  const button = screen.getByRole("button");

  user.click(button);

  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledTimes(1);
  expect(mock).toHaveBeenCalledWith({ name: "amir", email: "amir@test.com" });
});

test("empities two inputs after submit", () => {
  render(<UserForm onUserAdd={() => {}} />);

  const nameInput = screen.getByRole("textbox", {
    name: /name/i,
  });

  const emailInput = screen.getByRole("textbox", {
    name: /email/i,
  });

  user.click(nameInput);
  user.keyboard("amir");

  user.click(emailInput);
  user.keyboard("amir@test.com");

  const button = screen.getByRole("button");

  user.click(button);

  expect(nameInput).toHaveValue("");
  expect(emailInput).toHaveValue("");
});
