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
          },
        });
      } else {
        await prisma.cart.create({
          data: {
            product_id: Number(product_id),
            quantity: Number(quantity),
          },
        });
      }
      const cartItems = await prisma.cart.findMany({
        include: {
          products: true,
        },
      });
      // console.log(cartItems);
      const productTotals = {};

      const cartItemsWithTotal = cartItems.map((cartItem) => {
        const product = cartItem.products;
        const quantity =
          typeof product.quantity === "number" ? product.quantity : 0;
        const price = typeof product.price === "number" ? product.price : 0;

        const total = quantity * price;
        cartItem.total = total;

        if (!productTotals[product.id]) {
          productTotals[product.id] = 0;
        }
        productTotals[product.id] += total;
        return cartItem;
      });
      const total = Object.values(productTotals).reduce(
        (acc, curr) => acc + curr,
        0
      );
      res.status(200).json({
        message: "Product successfully added to cart",
        total,
        cart: cartItemsWithTotal,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to add to cart" });
    }
  },

  getCart: async (req, res) => {
    try {
      const cartItems = await prisma.cart.findMany({
        where: {
          id: req.user.id,
        },
        include: {
          products: true,
        },
      });
      console.log(cartItems);

      const cartItemsWithTotal = cartItems.map((cartItem) => {
        const product = cartItem.products;
        const quantity = product.quantity || 0;
        const price = product.price || 0;

        cartItem.total = quantity * price;
        return cartItem;
      });

      const total = cartItemsWithTotal.reduce(
        (acc, curr) => acc + curr.total,
        0
      );

      res.json({
        total,
        cart: cartItemsWithTotal,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to retrieve cart" });
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
