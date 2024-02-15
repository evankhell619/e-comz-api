import prisma from "../prisma.js";

const cart = {
  addToCart: async (req, res) => {
    try {
      const { product_id, quantity } = req.body;
      if (!product_id || !quantity) {
        return res
          .status(400)
          .json({ message: "Product_id, and quantity are required" });
      }
      const product = await prisma.product.findUnique({
        where: {
          id: Number(product_id),
        },
      });
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const total = Number(quantity * product.price);

      const itemExist = await prisma.cart.findFirst({
        where: {
          product_id: Number(product_id),
        },
      });
      if (itemExist) {
        await prisma.cart.update({
          where: {
            id: itemExist.id,
          },
          data: {
            quantity: {
              increment: Number(quantity),
            },
            user_id: req.user.id,
            total: (itemExist.quantity + quantity) * product.price,
          },
        });
      } else {
        await prisma.cart.create({
          data: {
            user_id: req.user.id,
            product_id: Number(product_id),
            quantity: Number(quantity),
            total,
          },
        });
      }
      const cartItems = await prisma.cart.findMany({
        where: {
          user_id: req.user.id,
        },
        include: {
          products: true,
        },
      });
      // console.log(cartItems);
      res.status(200).json({
        message: "Product successfully added to cart",
        total,
        cart: cartItems,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to add to cart" });
    }
  },

  getCart: async (req, res) => {
    try {
      const cartItems = await prisma.cart.findMany({
        where: {
          user_id: req.user.id,
        },
        include: {
          products: true,
        },
      });
      const total = cartItems.reduce((acc, curr) => acc + curr.total, 0);
      return res.json({
        total,
        cart: cartItems,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve cart", error });
    }
  },

  deleteItemCart: async (req, res) => {
    try {
      const deletedCartItem = await prisma.cart.delete({
        where: {
          id: +req.params.id,
        },
      });
      res.status(200).json({
        message: "Product success remove from cart",
        cart: deletedCartItem,
      });
    } catch (error) {
      res.status(500).json({ message: "Product failed to remove from cart" });
    }
  },
  changeQuantity: async (req, res) => {
    try {
      const { product_id, quantity } = req.body;
      const changeQuantity = await prisma.cart.update({
        where: {
          product_id: +req.params.id,
        },
        data: {
          quantity: +quantity,
        },
      });
      res.status(200).json({ message: "Change quantity success" });
    } catch (error) {
      res.status(500).json({ message: "Product failed to change quantity" });
    }
  },
};
export default cart;
