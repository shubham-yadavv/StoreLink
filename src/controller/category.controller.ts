import { Request, Response } from "express";
import Database from "../config/database";

class CategoryController{
    async getOrCreateCategory(name: string): Promise<number> {
        try {
    
          const result = await Database.query("SELECT id FROM category WHERE name = $1", [name]);
    
          if (result.rowCount === 1) {
            return result.rows[0].id;
          } else {
            const categoryID = await this.createCategory(name);
            return categoryID;
          }
        } catch (error) {
          console.error("Error retrieving category by name:", error);
          throw error;
        }
      }

      async createCategory(name: string): Promise<number> {
        try {    
          const result = await Database.query("INSERT INTO category (name) VALUES ($1) RETURNING id", [name]);
    
          if (result.rowCount === 1) {
            return result.rows[0].id;
          } else {
            throw new Error("Failed to create a new category.");
          }
        } catch (error) {
          console.error("Error creating category:", error);
          throw error;
        }
      }

}

export default new CategoryController()