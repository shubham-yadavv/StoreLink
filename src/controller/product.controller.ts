import { Request, Response } from "express";
import Database from "../config/database";

class ProductController {
  createInventory = async (req: Request, res: Response) => {
    try {
      const { name, description, mrp, sale_price, image, category, storeid } =
        req.body;
      if (!name || !description || !mrp || !sale_price || !category) {
        throw new Error("Input fields are required");
      }
      const categoryQuery = await Database.query(
        "SELECT id FROM category WHERE name = $1",
        [category]
      );

      let categoryId: number | undefined;

      if (categoryQuery.rowCount > 0) {
        categoryId = categoryQuery.rows[0].id;
      } else {
        const createCategoryQuery = await Database.query(
          "INSERT INTO category (name) VALUES ($1) RETURNING id",
          [category]
        );

        if (createCategoryQuery.rowCount === 1) {
          categoryId = createCategoryQuery.rows[0].id;
        } else {
          throw new Error("Failed to create a new category.");
        }
      }

      const newProduct = await Database.query(
        "INSERT INTO product (name, description, mrp, sale_price, image_url, category_id, store_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, name, image_url",
        [name, description, mrp, sale_price, image, categoryId, storeid]
      );

      console.log(newProduct.rows[0]);

      if (newProduct.rowCount === 1) {
        const { id, name, image_url } = newProduct.rows[0];
        res.status(200).json({
          productID: id,
          ProductName: name,
          image_url: image_url,
        });
      } else {
        throw new Error("Failed to create a new product.");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };

  getProductCatalog = async (req: Request, res: Response) => {
    const { store_link } = req.body;

    try {
      const storeQuery = await Database.query(
        `SELECT id AS storeId, name AS storeName, address AS storeAddress
         FROM store
         WHERE store_link = $1`,
        [store_link]
      );

      if (storeQuery.rowCount === 0) {
        throw new Error("store not found");
      }

      const storeInfo = storeQuery.rows[0];

      const categoryQuery = await Database.query(
        `SELECT c.name AS categoryName, p.id AS productId, p.name AS productName,
                p.description, p.sale_price AS price
         FROM category c
         LEFT JOIN product p ON c.id = p.category_id
         JOIN store s ON p.store_id = s.id
         WHERE s.store_link = $1
         ORDER BY c.name, p.name`,
        [store_link]
      );

      const productCatalog = [];

      let currentCategory = null;
      let currentCategoryProducts = [];

      for (const product of categoryQuery.rows) {
        if (product.categoryname !== currentCategory) {
          if (currentCategory !== null) {
            productCatalog.push({
              categoryName: currentCategory,
              products: currentCategoryProducts,
            });
          }
          currentCategory = product.categoryname;
          console.log(currentCategory);
          currentCategoryProducts = [];
        }

        currentCategoryProducts.push({
          productId: product.productid,
          productName: product.productname,
          description: product.description,
          price: product.price,
        });
      }

      if (currentCategory !== null) {
        productCatalog.push({
          categoryName: currentCategory,
          products: currentCategoryProducts,
        });
      }

      res.status(200).json({
        storeDetails: storeInfo,
        productCatalog: productCatalog,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: error.message });
    }
  };
}

export default new ProductController();
