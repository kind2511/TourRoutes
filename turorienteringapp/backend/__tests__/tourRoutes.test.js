const {
  getIndividualUsersTourRoutes,
} = require("../controllers/tourRouteController");
const TourRoute = require("../models/tourRouteModel");

// Mock the req, res, and next objects
const mockReq = { user: { id: "userId123" } };
const mockJson = jest.fn();
const mockStatus = jest.fn().mockImplementation(() => ({ json: mockJson }));
const mockRes = { status: mockStatus, json: mockJson };

// Mock the TourRoute.find function
jest.mock("../models/tourRouteModel");
TourRoute.find.mockResolvedValue([
  { routeName: "Route 1" },
  { routeName: "Route 2" },
]);

describe("getIndividualUsersTourRoutes controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Success case
  test("should fetch tour routes for the logged-in user", async () => {
    await getIndividualUsersTourRoutes(mockReq, mockRes);

    expect(TourRoute.find).toHaveBeenCalledWith({ user_id: "userId123" });
    expect(mockJson).toHaveBeenCalledWith({
      status: "success",
      data: {
        tourRoutes: expect.arrayContaining([
          expect.objectContaining({ routeName: "Route 1" }),
          expect.objectContaining({ routeName: "Route 2" }),
        ]),
      },
    });
    expect(mockStatus).toHaveBeenCalledWith(200);
  });

  // Error case
  test("should handle error case", async () => {
    const errorMessage = "Could not get tour routes";
    TourRoute.find.mockRejectedValueOnce(errorMessage);

    await getIndividualUsersTourRoutes(mockReq, mockRes);

    expect(TourRoute.find).toHaveBeenCalledWith({ user_id: "userId123" });
    expect(mockJson).toHaveBeenCalledWith({
      status: "fail",
      message: "Could not get tour routes",
    });
    expect(mockStatus).toHaveBeenCalledWith(400);
  });
});
