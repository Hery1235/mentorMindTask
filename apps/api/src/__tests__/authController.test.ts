import { login } from "../controllers/authController";
import { prisma } from "../config/prisma";
import * as jwt from "jsonwebtoken";

// Mock Prisma
jest.mock("../config/prisma", () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
    },
  },
}));

// Mock JWT secret
const JWT_SECRET = "test-secret";
const JWT_EXPIRES_IN = "1h";

describe("authController.login", () => {
  it("should return a token if user exists", async () => {
    // Mock user returned from prisma
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: "user123",
      email: "test@example.com",
      role: "teacher",
      schoolId: "school123",
    });

    // Call the function
    const result = await login("test@example.com");

    // Check token exists
    expect(result.token).toBeDefined();

    // Decode token to check payload
    const decoded = jwt.verify(result.token, JWT_SECRET) as any;
    expect(decoded.userId).toBe("user123");
    expect(decoded.role).toBe("teacher");
    expect(decoded.schoolId).toBe("school123");
  });

  it("should throw an error if user does not exist", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(login("missing@example.com")).rejects.toThrow(
      "User not found"
    );
  });
});
