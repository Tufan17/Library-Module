const express = require("express");
const { formatApiResponse } = require("../src/utils/responseFormatter");

const webRouter = express.Router();

webRouter.get("/*", (req, res, next) => {
  const response = formatApiResponse(
    req,
    "Web Viewing",
    "Getting web page view",
    ""
  );
  res.json(response);
});

module.exports = {
  webRouter,
};
