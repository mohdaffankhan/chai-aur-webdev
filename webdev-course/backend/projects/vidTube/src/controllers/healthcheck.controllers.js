import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

const healthCheck = asyncHandler(async (req, res) => {
  const response = new ApiResponse(200, "OK", "Health Check Passed" );
  res.status(response.statusCode).json(response);
});

export default healthCheck;