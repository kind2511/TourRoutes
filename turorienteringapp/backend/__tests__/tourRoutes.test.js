const {
  getIndividualUsersTourRoutes,
  deleteTourRoute,
} = require("../controllers/tourRouteController");
const TourRoute = require("../models/tourRouteModel");

// Mock the req, res, and next objects
const mockReq = { user: { id: "userId123" } };
const mockJson = jest.fn();
const mockStatus = jest.fn().mockImplementation(() => ({ json: mockJson }));
const mockRes = { status: mockStatus, json: mockJson };

// Mocks the TourRoute model
jest.mock("../models/tourRouteModel");

//-----------------------------------------------------------------------------------------------------------
// Mock the TourRoute.find function
TourRoute.find.mockResolvedValue([
  { routeName: "Route 1" },
  { routeName: "Route 2" },
]);

// Testing for getIndividualUsersTourRoutes controller
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

//-----------------------------------------------------------------------------------------------------------

// Mock the findByIdAndDelete mongoose function
TourRoute.findByIdAndDelete.mockResolvedValue({ _id: "tourRouteId123" });

// Mock the req object
const mockReqDeleteTourRoute = { params: { id: "tourRouteId123" } };

// Testing the deleteTourRoute controller
describe("deleteTourRoute controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Success case
  test("should delete a tour route based on tour route ID", async () => {
    await deleteTourRoute(mockReqDeleteTourRoute, mockRes);

    expect(TourRoute.findByIdAndDelete).toHaveBeenCalledWith("tourRouteId123");
    expect(mockJson).toHaveBeenCalledWith({
      status: "success",
      message: "Tour route has been deleted successfully",
    });
    expect(mockStatus).toHaveBeenCalledWith(200);
  });

  // Error case
  test("should handle error case", async () => {
    const errorMessage = "Error deleting tour route";
    TourRoute.findByIdAndDelete.mockRejectedValueOnce(errorMessage);

    await deleteTourRoute(mockReqDeleteTourRoute, mockRes);

    expect(TourRoute.findByIdAndDelete).toHaveBeenCalledWith("tourRouteId123");
    expect(mockJson).toHaveBeenCalledWith({
      status: "fail",
      message: "Could not delete requested tour route",
    });
    expect(mockStatus).toHaveBeenCalledWith(400);
  });
});
