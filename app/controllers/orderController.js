import cartController from "./cartController.js";

const order = {
  addOrder: async (req, res) => {
    try {
      const cart = await cartController.getCart(req.user.id);
      await this.prisma.$transaction(async (transaction) => {
        const newOrder = await transaction.order.create({
          data: {
            date: new Date(),
            number: `ORD/${Math.floor(Math.random() * 1000)}`,
            total: cart.total,
          },
        });
        console.log(cart);

        await transaction.orderItem.createMany({
          data: cart.products.map((product) => ({
            where: { user_id: req.user.id },
            order_id: newOrder.id,
            product_id: product.product_id,
            quantity: product.quantity,
            price: product.price,
            total: product.total,
          })),
        });

        await cartController.empty(req.user.id);
      });
      res.status(200).json({ message: "Order successfully added" });
    } catch (error) {
      res.status(500).json({ message: "Failed to add order" });
    }
  },
  getOrder: async (req, res) => {
    try {
      const orderId = Number(req.params.id);
      const foundOrder = await this.prisma.order.findUnique({
        where: { id: orderId },
        include: {
          order_items: {
            include: {
              product: true,
            },
          },
        },
      });

      if (!foundOrder) {
        throw new Error("Order not found");
      }

      return foundOrder;
    } catch (err) {
      console.error(err);
      throw new Error("Error while fetching the order");
    }
  },
};

export default order;
