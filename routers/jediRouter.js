const express = require("express");
const { validateSchema, jediSchema } = require("../middleware/validation");
const auth = require("../middleware/auth");
const {
   createJedi,
   getAll,
   getJedi,
   replaceJedi,
   deleteJedi,
} = require("../controllers/jediController");

const jediRouter = express.Router();

//TODO 6 Add validation schema in proper request
//TODO 8 Add auth middleware to all routes
jediRouter.get("/", auth, getAll);
jediRouter.get("/:id", auth, getJedi);
jediRouter.post("/", auth, validateSchema(jediSchema), createJedi);
jediRouter.put("/:id", auth, validateSchema(jediSchema), replaceJedi);
jediRouter.delete("/:id", auth, deleteJedi);

module.exports = jediRouter;
