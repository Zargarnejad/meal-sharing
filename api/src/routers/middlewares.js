//check the id
export const validateId = (req, res, next) => {
  const { id } = req.params;
  const numId = Number(id);
  if (!Number.isInteger(numId) || numId <= 0) {
    return res
      .status(400)
      .json({ error: "Id must be a number greater than 0." });
  }
  next();
};
