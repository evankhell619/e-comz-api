import prisma from "../prisma.js";

const product = {
  createProduct: async (req, res) => {
    try {
      const { name, category, price } = req.body;
      if (!name || !category || !price) {
        return res
          .status(400)
          .json({ message: "Name, category, and price are required" });
      }
      const createdProduct = await prisma.product.create({
        data: {
          name,
          category: category,
          price: Number(price),
        },
      });
      res.status(200).json({
        message: "Product created successfully",
        product: createdProduct,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to create product" });
    }
  },

  allProduct: async (req, res) => {
    try {
      const products = await prisma.product.findMany({
        skip: +req.query.skip || 0,
      });
      res.json({
        data: products,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve products" });
    }
  },
  getProductbyId: async (req, res) => {
    try {
      const product = await prisma.product.findFirstOrThrow({
        where: {
          id: +req.params.id,
        },
      });
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve product by id" });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const product = await prisma.product.delete({
        where: {
          id: +req.params.id,
        },
      });
      res.status(200).json({ message: "Success remove product" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete product" });
    }
  },
};

export default product;
