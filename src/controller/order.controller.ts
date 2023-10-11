import { Request, Response } from "express";
import Database from "../config/database";

class OrderController {
  placeOrder = async (req: Request, res: Response) => {
    try {
      const { storeId } = req.body;

      const userSession = req.session;

      const cart = userSession.cart;

      if (!cart || cart.length === 0) {
        return res
          .status(400)
          .json({
            error:
              "Cart is empty. Add items to the cart before placing an order.",
          });
      }

      const newOrderQuery = await Database.query(
        "INSERT INTO orders (store_id, customer_id, order_date, status) VALUES ($1, $2, NOW(), $3) RETURNING id",
        [storeId, req.user.id , "pending"]
      );

      const orderId = newOrderQuery.rows[0].id;

      for (const cartItem of cart) {
        const { productId, quantity } = cartItem;

        await Database.query(
          "INSERT INTO order_item (order_id, product_id, quantity) VALUES ($1, $2, $3)",
          [orderId, productId, quantity]
        );
      }

      userSession.cart = [];

      res.status(201).json({ message: "Order placed successfully", orderId });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: error.message });
    }
  };

  acceptOrder = async (req: Request, res: Response) => {
    const { orderID, status } = req.body;

    try {
      await Database.query("UPDATE orders SET status = $1 WHERE id = $2", [
        status,
        orderID,
      ]);

      res.status(200).json({ message: "Order status updated successfully" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: error.message });
    }
  };
}

export default new OrderController();
