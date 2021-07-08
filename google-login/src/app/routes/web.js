const express = require("express");
const router = express.Router();


let routes = app => {
 

  return app.use("/", router);
};

module.exports = routes;