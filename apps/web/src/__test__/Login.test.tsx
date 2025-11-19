import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Login } from "../pages/Login";
import { useAuth } from "../store/AuthContext";
import { login as mockLogin } from "../api/auth";
import { MemoryRouter } from "react-router-dom";

// Mock dependencies
vi.mock("../store/AuthContext");
vi.mock("../api/auth");
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe("Login Component", () => {
  const setTokenMock = vi.fn();

  beforeEach(() => {
    (useAuth as vi.Mock).mockReturnValue({ setToken: setTokenMock });
    (mockLogin as vi.Mock).mockReset();
    setTokenMock.mockReset();
  });

  it("renders the login form", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
  });

  it("calls login API and sets token on submit", async () => {
    const fakeToken = "fake-jwt-token";
    (mockLogin as vi.Mock).mockResolvedValue({ token: fakeToken });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    // Type email
    await userEvent.type(emailInput, "test@example.com");

    // Submit form
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("test@example.com");
      expect(setTokenMock).toHaveBeenCalledWith(fakeToken);
    });
  });

  it("shows alert on login failure", async () => {
    vi.spyOn(window, "alert").mockImplementation(() => {});
    (mockLogin as vi.Mock).mockRejectedValue(new Error("Login failed"));

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    await userEvent.type(emailInput, "fail@example.com");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "Login failed. Please check your credentials."
      );
    });
  });
});
