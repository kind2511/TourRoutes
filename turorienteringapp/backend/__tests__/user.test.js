const {
  getUsers,
  getUser,
  deleteMyProfile,
} = require("../controllers/userController");
const User = require("../models/usersModel");

// Mocks the User Model and the request object
jest.mock("../models/usersModel");
const mockJson = jest.fn();
const mockStatus = jest.fn().mockImplementation(() => ({ json: mockJson }));
const res = { status: mockStatus };

//-----------------------------------------------------------------------------------------------

// Testing of the getUsers controller
describe("getUsers controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Success case
  test("should find the users", async () => {
    const mockUsers = [{ name: "User1" }, { name: "User2" }];
    User.find.mockResolvedValue(mockUsers);

    await getUsers(null, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith({
      status: "success",
      data: {
        users: mockUsers,
      },
    });
  });

  // Error case
  test("should not find the users", async () => {
    const errorMessage = "Error fetching users";
    User.find.mockRejectedValue(errorMessage);

    await getUsers(null, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({
      status: "fail",
      message: "Could retrive all users",
    });
  });
});

//-----------------------------------------------------------------------------------------------

// Testing of the getUser controller
describe("getUser controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Success case
  test("should handle success case", async () => {
    const mockUser = { _id: "user123", name: "John Doe" };
    User.findById.mockResolvedValue(mockUser);

    // Mock the request object with the necessary parameters
    const req = { params: { id: "user123" } };

    await getUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith({
      status: "success",
      data: {
        user: mockUser,
      },
    });
  });

  // Error case
  test("should handle error case", async () => {
    const errorMessage = "User not found";
    User.findById.mockRejectedValue(errorMessage);

    // Mock the request object with the necessary parameters
    const req = { params: { id: "user123" } };

    await getUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({
      status: "fail",
      message: "Could not find user",
    });
  });
});

//-----------------------------------------------------------------------------------------------

// Testing of the deleteMyProfile controller
describe("deleteMyProfile controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Success Case
  test("should handle success case", async () => {
    // Mock the User.findByIdAndDelete function to resolve successfully
    User.findByIdAndDelete.mockResolvedValueOnce({ _id: "user123" });

    // Mock the request object with the necessary parameters
    const req = { user: { id: "user123" } };

    await deleteMyProfile(req, res);

    expect(User.findByIdAndDelete).toHaveBeenCalledWith("user123");
    expect(res.status).toHaveBeenCalledWith(204);
    expect(mockJson).toHaveBeenCalledWith({
      status: "success",
      data: null,
    });
  });

  // Error case
  test("should handle error case", async () => {
    // Mock the User.findByIdAndDelete function to reject with an error message
    const errorMessage = "Error deleting account";
    User.findByIdAndDelete.mockRejectedValueOnce(errorMessage);

    // Mock the request object with the necessary parameters
    const req = { user: { id: "user123" } };

    await deleteMyProfile(req, res);

    expect(User.findByIdAndDelete).toHaveBeenCalledWith("user123");
    expect(res.status).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({
      status: "fail",
      message: "Could not delete account",
    });
  });
});

//-----------------------------------------------------------------------------------------------

