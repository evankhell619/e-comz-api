import prisma from "../prisma.js";
import bcrypt, { hashSync } from "bcrypt";
import crypto from "crypto";

export const signUp = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const userExists = await prisma.user.findFirst({ where: { email } });

    if (userExists) {
      throw new Error("User already exists");
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashSync(password, 10),
        role_id: 4,
      },
    });

    res.status(200).json({ message: "User created success", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      throw new Error("User doesn't exist");
    }

    if (!comparePasswords(password, user.password)) {
      throw new Error("Incorrect password");
    }

    let tokenRecord = await prisma.token.findFirst({
      where: { user_id: user.id, expires_at: { gt: new Date() } },
    });

    let token;
    if (!tokenRecord) {
      token = generateToken();
      await prisma.token.create({
        data: {
          token,
          user_id: user.id,
          expires_at: new Date(Date.now() + 30 * 60 * 1000),
        },
      });
    } else {
      token = tokenRecord.token;
    }

    res.status(200).json({ message: "Login success", user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const comparePasswords = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

const generateToken = () => {
  return crypto.randomBytes(64).toString("base64");
};
