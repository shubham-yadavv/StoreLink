import { Request, Response } from "express";
import Database from "../config/database";

class StoreController {
  createStore = async (req: Request, res: Response) => {
    const { name, address } = req.body;

    if (!name || !address) {
      res.status(400).json({ error: "Store name and address are required." });
      throw new Error("Store name and address are required");
    }

    try {
      const storeLink = this.generateStoreLink(name);

      const queryText =
        "INSERT INTO store (name, address, seller_id, store_link) VALUES ($1, $2, $3, $4) RETURNING id";
      const queryValues = [name, address, req.user.id, storeLink];

      const result = await Database.query(queryText, queryValues);

      if (result.rowCount === 1) {
        const storeID = result.rows[0].id;
        res.status(201).json({
          storeID,
          storeLink,
        });
      } else {
        throw new Error("Failed to create a new store.");
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: error.message });
    }
  };

  private generateStoreLink(storeName: string): string {
    const cleanedStoreName = storeName.replace(/\s/g, "").toLowerCase();
    const randomString = Math.random().toString(36).substring(2, 10);
    return `http://${cleanedStoreName}-${randomString}`;
  }

  
  getStoreDetails = async (req: Request, res: Response) => {
    const { store_link } = req.body;
  
    try {
      // Fetch store details
      const storeDetails = await Database.query(
        `
        SELECT id AS storeId, name AS store_name, address
        FROM store
        WHERE store_link = $1
        `,
        [store_link]
      );
  
      if (storeDetails.rowCount === 0) {
        return res.status(404).json({ message: "Store not found" });
      }
  
      const storeInfo = storeDetails.rows[0];
  

      res.status(200).json(storeInfo);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: error.message });
    }
  };
  
  
}

export default new StoreController();
// SELECT
// c.id AS categoryId,
// c.name AS categoryName,
// p.id AS productId,
// p.name AS productName,
// p.description,
// p.mrp,
// p.sale_price AS salePrice,
// p.image_url AS imageUrl
// FROM category c
// LEFT JOIN product p ON c.id = p.category_id
// JOIN store s ON p.store_id = s.id
// WHERE s.store_link = $1
// ORDER BY c.name, p.name;