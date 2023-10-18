import { Request, Response } from "express";
import Database from "../config/database";
import jwt from "jsonwebtoken";

const secret = 'secret'

class AccountController{
    createAccount = async (req: Request, res: Response) => {
        const { mobile_number, otp } = req.body;
    
        try {
          const existingUser = await Database.query(
            "SELECT * FROM account WHERE mobile_number = $1",
            [mobile_number]
          );
    
          if (existingUser.rowCount > 0) {
            throw new Error("mobile number already exists.");
          }
    
          const newUser = await Database.query(
            "INSERT INTO account (mobile_number, otp) VALUES ($1, $2) RETURNING id",
            [mobile_number, otp]
          );
    
          if (newUser.rowCount === 1) {
            const userID = newUser.rows[0].id;
            const token = jwt.sign({ id: userID, mobile_number }, secret.toString(), {
              expiresIn: "1h",
            });
    
            res
              .status(201)
              .json({ message: "Account created successfully", token, userID });
          } else {
            throw new Error("Failed to create a new seller account.");
          }
        } catch (error) {
          console.error("Error:", error);
          res.status(500).json({ error: error.message });
        }
      };
    

      authtest = async (req: Request, res: Response) => {
        const userID = req.user.id;
    
        try {
          const result = await Database.query(
            "SELECT * FROM account WHERE id = $1",
            [userID]
          );
    
          if (result.rowCount === 1) {
            const user = result.rows[0];
            res.json({
              user: user,
              userID: userID,
            });
          } else {
            throw new Error("user not fount")
          }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: error.message });
        }
      };
    
}

export default new AccountController();