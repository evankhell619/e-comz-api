import prisma from "../prisma.js";

const authToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      message: "User Unauthorized",
    });
  }

  const tokenRecord = await prisma.token.findFirst({
    where: { token: token },
    include: { user: true },
  });

  // console.log(tokenRecord);
  if (!tokenRecord) {
    return res.status(401).json({
      message: "Unauthorized request",
    });
  }

  req.user = tokenRecord.user;
  next();
};

export default authToken;
