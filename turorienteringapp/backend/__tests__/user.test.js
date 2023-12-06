const {
  getUsers,
  getUser,
  deleteMyProfile,
  deleteUser,
  promoteToAdmin,
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

const mockReq = { params: { id: "userId123" } };
const mockRes = { status: mockStatus, json: mockJson };

// Testing of the  delete user controller
describe("deleteUser controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Success case
  test("should delete a user based on user ID", async () => {
    await deleteUser(mockReq, mockRes);

    expect(User.findByIdAndDelete).toHaveBeenCalledWith("userId123");
    expect(mockJson).toHaveBeenCalledWith({
      status: "success",
      message: "User has been deleted successfully",
    });
    expect(mockStatus).toHaveBeenCalledWith(200);
  });

  // Error case
  test("should handle error case", async () => {
    const errorMessage = "Error deleting user";
    User.findByIdAndDelete.mockRejectedValueOnce(errorMessage);

    await deleteUser(mockReq, mockRes);

    expect(User.findByIdAndDelete).toHaveBeenCalledWith("userId123");
    expect(mockJson).toHaveBeenCalledWith({
      status: "fail",
      message: "Could not delete user",
    });
    expect(mockStatus).toHaveBeenCalledWith(400);
  });
});

//-----------------------------------------------------------------------------------------------

// Mocking findByIdAndUpdate mongoose function
User.findByIdAndUpdate.mockResolvedValue({ _id: "userId123", role: "admin" });

// Testing of the promote to admin controller
describe("promoteToAdmin controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Sucess case
  test("should promote a user to admin", async () => {
    await promoteToAdmin(mockReq, mockRes);

    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
      "userId123",
      { role: "admin" },
      { new: true, runValidators: true }
    );
    expect(mockJson).toHaveBeenCalledWith({
      status: "success",
      message: "User has been promoted to admin",
      data: { user: { _id: "userId123", role: "admin" } },
    });
    expect(mockStatus).toHaveBeenCalledWith(200);
  });

  // Error case
  test("should handle error case", async () => {
    const errorMessage = "Error promoting user to admin";
    User.findByIdAndUpdate.mockRejectedValueOnce(errorMessage);

    await promoteToAdmin(mockReq, mockRes);

    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
      "userId123",
      { role: "admin" },
      { new: true, runValidators: true }
    );
    expect(mockJson).toHaveBeenCalledWith({
      status: "fail",
      message: "Could not promote user to admin",
    });
    expect(mockStatus).toHaveBeenCalledWith(400);
  });
});
