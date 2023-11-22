const { signup, isAdmin } = require("../controllers/authentificationContoller");
const User = require("../models/usersModel");

// Mocks the User Model and the request object
jest.mock("../models/usersModel");
const mockJson = jest.fn();
const mockStatus = jest.fn().mockImplementation(() => ({ json: mockJson }));
const res = { status: mockStatus };

//-----------------------------------------------------------------------------------------------

// Testing of the signUp controller
describe("signup controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Success case
  test("should handle success case", async () => {
    // Mock the User.create function to resolve successfully
    const mockUser = {
      _id: "user123",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      role: "user",
    };
    User.create.mockResolvedValueOnce(mockUser);

    // Mock the request object with the necessary parameters
    const req = {
      body: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        password: "password123",
        confirmPassword: "password123",
        role: "user",
      },
    };

    await signup(req, res);

    expect(User.create).toHaveBeenCalledWith({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "password123",
      confirmPassword: "password123",
      role: "user",
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(mockJson).toHaveBeenCalledWith({
      status: "success",
      data: {
        user: mockUser,
      },
    });
  });

  // Error case
  test("should handle error case", async () => {
    // Mock the User.create function to reject with an error message
    const errorMessage = "Error registering new user";
    User.create.mockRejectedValueOnce(errorMessage);

    // Mock the request object with the necessary parameters
    const req = {
      body: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        password: "password123",
        confirmPassword: "password123",
        role: "user",
      },
    };

    await signup(req, res);

    expect(User.create).toHaveBeenCalledWith({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "password123",
      confirmPassword: "password123",
      role: "user",
    });
    expect(res.status).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({
      status: "fail",
      message: errorMessage,
    });
  });
});

//-----------------------------------------------------------------------------------------------

// Mock the req, res, and next objects
const mockReq = { user: { role: "admin" } };
const mockRes = { status: jest.fn(() => ({ json: mockJson })), json: mockJson };
const mockNext = jest.fn();

// Testing of the isAdmin middleware
describe("isAdmin middleware", () => {
  // Success Case
  test("should allow access for admin user", () => {
    isAdmin(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockJson).not.toHaveBeenCalled();
  });

  // Error case
  test("should deny access for non-admin user", () => {
    const nonAdminReq = { user: { role: "user" } };
    isAdmin(nonAdminReq, mockRes, mockNext);

    expect(mockNext).not.toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(403);
    expect(mockJson).toHaveBeenCalledWith({
      status: "fail",
      message:
        "You do not have required authorization to carry out this action",
    });
  });
});

//-----------------------------------------------------------------------------------------------
