const { body, validationResult, checkSchema } = require("express-validator");

function validate() {
   return [
      body("id", "id not valid number").exists().isNumeric(),
      body("name", "name dosn`t not exists or invalid").exists().isString().escape(),
      body("gender", "password doesn't exists").isIn(["male", "female"]),
      (req, res, next) => {
         try {
            validationResult(req).throw();
            next();
         } catch (err) {
            console.log(err);
            res.status(400).json({
               status: 400,
               error: err.errors.map((value) => value.msg).join(),
            });
         }
      },
   ];
}

function validateSchema(schema) {
   const validationMiddleware = checkSchema(schema);
   return async (req, res, next) => {
      await validationMiddleware.run(req);
      const result = validationResult(req);
      if (result.isEmpty()) {
         next();
         return;
      }
      const error = Error(
         result
            .array()
            .map((value) => value.msg)
            .join()
      );
      error.statusCode = 400;
      next(error);
   };
}

//TODO 5: Add missing fields
const jediSchema = {
   id: {
      isInt: true,
      errorMessage: "ID is wrong",
      in: ["body"],
   },
   name: {
      isString: {
         errorMessage: "Name is wrong",
      },
      isLength: {
         errorMessage: "Name should be 4 chars long",
         options: { min: 4 },
      },
      in: ["body"],
   },
   height: {
      isInt: {
         options: { gt: 0, lt: 300 },
         errorMessage: "Height should be in 0-300 range",
      },
      in: ["body"],
   },
   mass: {
      isInt: { options: { gt: 0 }, errorMessage: "No mass? how is it possible?" },
      in: ["body"],
   },
   hair_color: {
      isString: {
         errorMessage: "Hair should be a string",
      },
      isLength: { options: { min: 3 }, errorMessage: "Hair needs to be at least 3 chars" },
      in: ["body"],
   },
   skin_color: {
      isString: {
         errorMessage: "Skin color should be a string",
      },
      isLength: { options: { min: 3 }, errorMessage: "Skin color needs to be at least 3 chars" },
      in: ["body"],
   },
   birth_year: {
      isString: {
         errorMessage: "Birth year should be a string",
      },
      isLength: { options: { min: 4 }, errorMessage: "Birth year needs to be at least 4 chars" },
      in: ["body"],
   },
   eye_color: {
      isString: {
         errorMessage: "Eye color should be a string",
      },
      isLength: { options: { min: 4 }, errorMessage: "ye color needs to be at least 4 chars" },
      in: ["body"],
   },
   gender: {
      isString: {
         errorMessage: "gender should be a string",
      },
      in: ["body"],
   },
};

module.exports = {
   validateSchema,
   jediSchema,
};
