const { signup } = require("../controllers/authentificationContoller");
const User = require("../models/usersModel");

// Mocks the User Model and the request object
jest.mock("../models/usersModel");
const mockJson = jest.fn();
const mockStatus = jest.fn().mockImplementation(() => ({ json: mockJson }));
const res = { status: mockStatus };

// Testing of the signUp controller
describe('signup controller', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    // Success case
    test('should handle success case', async () => {
      // Mock the User.create function to resolve successfully
      const mockUser = {
        _id: 'user123',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: 'user',
      };
      User.create.mockResolvedValueOnce(mockUser);
  
      // Mock the request object with the necessary parameters
      const req = {
        body: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          password: 'password123',
          confirmPassword: 'password123',
          role: 'user',
        },
      };
  
      await signup(req, res);
  
      expect(User.create).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        role: 'user',
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith({
        status: 'success',
        data: {
          user: mockUser,
        },
      });
    });
  
    // Error case
    test('should handle error case', async () => {
      // Mock the User.create function to reject with an error message
      const errorMessage = 'Error registering new user';
      User.create.mockRejectedValueOnce(errorMessage);
  
      // Mock the request object with the necessary parameters
      const req = {
        body: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          password: 'password123',
          confirmPassword: 'password123',
          role: 'user',
        },
      };
  
      await signup(req, res);
  
      expect(User.create).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        role: 'user',
      });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({
        status: 'fail',
        message: errorMessage,
      });
    });
  });