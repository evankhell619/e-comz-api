import prisma from "../prisma.js";

export const validateSignup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const error = {};

  if (!name) {
    error.name = "Name is required";
  }

  if (typeof email !== "string") {
    error.email = "Incorrect e-mail format";
  }

  if (typeof password !== "string" || !isValidPassword(password)) {
    error.password = "Password must have min 8 char and 1 number";
  }

  if (Object.keys(error).length > 0) {
    return res.status(422).json(error);
  }

  try {
    const user = await prisma.user.findFirst({ where: { email } });
    if (user) {
      throw new Error("User already exists");
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const validateLogin = (req, res, next) => {
  const errors = {};

  if (!req.body.email) {
    errors.email = "Email is required";
  }

  if (!req.body.password) {
    errors.password = "Password is required";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json(errors);
  }

  next();
};
const isValidPassword = (password) => {
  const passwordRegex = /^(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};
