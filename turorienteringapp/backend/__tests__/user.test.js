const { getUsers } = require("../handlers/userHandler");
const User = require("../models/usersModel");

// Mocks the User Model and the request object
jest.mock("../models/usersModel");
const mockJson = jest.fn();
const mockStatus = jest.fn().mockImplementation(() => ({ json: mockJson }));
const res = { status: mockStatus };

describe("getUsers handler", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should handle success case", async () => {
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

  test("should handle error case", async () => {
    const errorMessage = "Error fetching users";
    User.find.mockRejectedValue(errorMessage);

    await getUsers(null, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({
      status: "fail",
      message: errorMessage,
    });
  });
});
