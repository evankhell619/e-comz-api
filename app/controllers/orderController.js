import prisma from "../prisma.js";

const order = {
  addOrder: async (req, res) => {
    try {
      // const cart = await cartController.getCart(req.user.id);
      const cart = await prisma.cart.findMany({
        where: {
          user_id: req.user.id,
        },
        include: {
          products: true,
        },
      });
      console.log(cart);
      await prisma.$transaction(async (transaction) => {
        const newOrder = await transaction.order.create({
          data: {
            date: new Date(),
            number: `ORD/${Math.floor(Math.random() * 1000)}`,
            total: cart.total,
          },
        });

        const boughtProducts = await prisma.cart.findMany({
          where: {
            user_id: req.user.id,
          },
          include: {
            products: true,
          },
        });

        await transaction.orderItem.createMany({
          data: boughtProducts.map((product) => {
            return {
              order_id: newOrder.id,
              product_id: product.product_id,
              quantity: product.quantity,
              price: product.products.price,
              total_price: product.total_price,
            };
          }),
        });
      });
      res.status(200).json({ message: "Order successfully added" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to add order" });
    }
  },
  getOrder: async (req, res) => {
    try {
      const orderId = Number(req.params.id);
      const foundOrder = await prisma.order.findUnique({
        where: { id: orderId },
        include: {
          product: true,
        },
      });
      console.log(foundOrder);
      if (!foundOrder) {
        throw new Error("Order not found");
      }
      return res.status(200).json({ message: "Your order ", foundOrder });
    } catch (err) {
      console.error(err);
      throw new Error("Error while fetching the order");
    }
  },
};

export default order;
