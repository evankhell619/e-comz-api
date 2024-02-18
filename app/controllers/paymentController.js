import axios from "axios";
import prisma from "../prisma.js";

const payment = {
  addPayment: async (req, res) => {
    try {
      const { order_id, amount, cardNumber, cvv, expiryMonth, expiryYear } =
        req.body;
      const order = await prisma.order.findUnique({
        where: {
          id: +order_id,
        },
      });
      if (!order) return res.status(400).json({ msg: "No found order" });

      const response = await axios.post("http://localhost:3000/pay", {
        amount,
        cardNumber,
        cvv,
        expiryMonth,
        expiryYear,
      });

      if (response.status === 200) {
        await prisma.order.update({
          where: { id: +order_id },
          data: { status: "paid" },
        });

        const newOrder = await prisma.order.findUnique({
          where: { id: +order_id },
        });

        return res.status(200).json({
          success: true,
          message: "Payment successful",
          order: newOrder,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Payment failed",
          response,
        });
      }
    } catch (err) {
      console.error(err);
      res.status(400).json({ msg: "Fail" });
    }
  },
};
export default payment;
