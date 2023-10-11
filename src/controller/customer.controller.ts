import { Request, Response } from "express";
import Database from "../config/database";
import jwt from "jsonwebtoken";

class CustomerController {
  createCustomer = async (req: Request, res: Response) => {
    try {
      const { mobile_number, address } = req.body;

      if (!mobile_number || !address) {
        return res.status(400).json({ error: "Mobile number and address are required" });
      }

      const existingCustomerQuery = await Database.query(
        "SELECT id FROM customer WHERE mobile_number = $1",
        [mobile_number]
      );

      if (existingCustomerQuery.rowCount > 0) {
        return res.status(400).json({ error: "Customer with this mobile number already exists" });
      }

      const newCustomerQuery = await Database.query(
        "INSERT INTO customer (mobile_number, address) VALUES ($1, $2) RETURNING id",
        [mobile_number, address]
      );

      const customer = {
        id: newCustomerQuery.rows[0].id,
        mobile_number,
        address,
      };
      const token = jwt.sign(customer, "secret", {
        expiresIn: "1h", 
      });

      res.status(201).json({ message: "Customer created successfully", token });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: error.message });
    }
  };
}

export default new CustomerController();
