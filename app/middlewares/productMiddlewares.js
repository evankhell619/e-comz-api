import prisma from "../prisma.js";

const validateProduct = async (req, res, next) => {
  const { name, category, price } = req.body;
  const error = {};

  if (!name) {
    error.name = "Name is required";
  }

  if (!category) {
    error.category = "Category is required";
  }

  if (!price || Number(price) || price <= 0) {
    error.price = "Invalid price";
  }

  if (Object.keys(error).length > 0) {
    return res.status(422).json(error);
  }

  try {
    const productExist = await prisma.product.findFirst({
      where: { name },
    });

    if (productExist) {
      throw new Error("Product with the same name already exists");
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default validateProduct;
