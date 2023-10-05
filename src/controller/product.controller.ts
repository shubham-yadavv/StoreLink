import { Request, Response } from "express";
import Database from "../config/database";

import categoryController from "./category.controller";

class ProductController {
  createInverntory = async (req: Request, res: Response) => {
    const { name, description, mrp, sale_price, image, category } = req.body;
    if (!name || !description || !mrp || !sale_price || !category) {
      res.status(400).json({ error: "input are required." });
      return;
    }
    try {
      const categoryId = await categoryController.getOrCreateCategory(category);

      const result = await Database.query(
        "INSERT INTO product (name, description, mrp, sale_price, image_url, category_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, name, image_url",
        [name, description, mrp, sale_price, image, categoryId]
      );

      if (result.rowCount === 1) {
        const { id, name: productName, image_url } = result.rows[0];
        res.status(200).json({
          productID: id,
          ProductName: productName,
          image_url: image_url,
        });
      } else {
        throw new Error("Failed to create a new product.");
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

export default new ProductController();
