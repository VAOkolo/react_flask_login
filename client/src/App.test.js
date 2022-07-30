import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

test("should say welcome on main screen", () => {
  render(
    <Router>
      <App />
    </Router>
  );

  const linkElement = screen.getByText(/welcome/i);
  expect(linkElement).toBeInTheDocument();
});
