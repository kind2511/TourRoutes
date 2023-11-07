const userHandler = require("../handlers/userHandler");

const request = {
  body: {
    firstName: "mockFirstName",
    lastName: "monckLastName",
    email: "mockEmail",
    password: "mockPassword",
    confirmPassword: "mockConfirmPassword",
    role: "user",
  },
};

it("test", async () => {
  await userHandler.signup(request);
});

