const { request } = require("express");

// TODO 7: Add auth middleware
module.exports = function auth(req, res, next) {
   const authHeader = req.header("Authorization");
   if (authHeader.substr(7) === "may_the_force_be_with_you") {
      next();
   } else {
      let error = Error();
      error.statusCode = 401;
      error.message = "Wrong Authorization";
      throw error;
   }
};
