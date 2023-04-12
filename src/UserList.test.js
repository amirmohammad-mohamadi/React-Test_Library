import { render, screen, within } from "@testing-library/react";
import UserList from "./UserList";

const renderComponent = () => {
  const users = [
    { name: "amir", email: "amir@test.com" },
    { name: "milad", email: "milad@test.com" },
  ];

  render(<UserList users={users} />);

  return { users };
};

test("render one row per user", () => {
  renderComponent();
  //   const { container } = render(<UserList users={users} />);

  //   debug statement
  //   screen.logTestingPlaygroundURL();

  //   get errors here
  // const rows = screen.getAllByRole("row");
  const rows = within(screen.getByTestId("users")).getAllByRole("row");
  //   eslint-disable-next-line
  //   other solution
  //   const rows = container.querySelectorAll("tbody tr");

  expect(rows).toHaveLength(2);
});

test("render the email and name of each user", () => {
  const { users } = renderComponent();

  for (let user of users) {
    const name = screen.getByRole("cell", { name: user.name });
    const email = screen.getByRole("cell", { name: user.email });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});
