const handleValidationError = (err, res) => {
  let errors = Object.values(err.errors).map((e) => e.message);
  let fields = Object.values(err.errors).map((e) => e.path);

  let result;

  if (errors.length > 0) {
    result = Object.assign(...fields.map((k, i) => ({ [k]: errors[i] })));
  }

  res.status(400).send({ success: false, error: result });
};

export default (err, req, res, next) => {
  try {
    if (err.name === "ValidationError")
      return (err = handleValidationError(err, res));

    if (err.name === "JsonWebTokenError")
      return res.status(400).send({
        success: false,
        error: "Json Web Token is invalid, Try again",
      });

    if (err.name === "TokenExpiredError") {
      return res.status(400).send({
        success: false,
        error: "Json Web Token is expired, Try again",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }
};
