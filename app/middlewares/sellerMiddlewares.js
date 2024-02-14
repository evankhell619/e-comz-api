import prisma from "../prisma.js";

const validateSeller = async (req, res, next) => {
  const user = req.user;

  try {
    const userRole = await prisma.role.findUnique({
      where: {
        id: user.role_id,
      },
    });

    if (userRole && userRole.name === "seller") {
      next();
    } else {
      throw new Error("User unauthorized");
    }
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

export default validateSeller;
