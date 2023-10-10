import { Request, Response } from "express";
import Database from "../config/database";

class OrderController {
  acceptOrder = async (req: Request, res: Response) => {
    const { customerDetails, orderData } = req.body;

    try {
      const { mobile_number, address } = customerDetails;
      const { store_id } = orderData;

      // check existing customer
      const existingCustomer = await Database.query(
        "SELECT * FROM customer WHERE mobile_number = $1",
        [mobile_number]
      );

      let customerId;

      if (existingCustomer.rowCount === 0) {
        // If the customer doesn't exist, create a new customer record
        const newCustomer = await Database.query(
          "INSERT INTO customer (mobile_number, address) VALUES ($1, $2) RETURNING id",
          [mobile_number, address]
        );
        customerId = newCustomer.rows[0].id;
      } else {
        // If the customer already exists, use their existing customer ID
        customerId = existingCustomer.rows[0].id;
      }

      // create order

      const newOrder = await Database.query(
        "INSERT INTO orders (store_id, customer_id, order_date) VALUES ($1, $2, NOW()) RETURNING id",
        [store_id, customerId]
      );
      const orderId = newOrder.rows[0].id;

      res.status(201).json({ message: "Order placed successfully", orderId });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: error.message });
    }
  };
}


export default new OrderController()