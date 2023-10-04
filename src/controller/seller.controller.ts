import { Request, Response } from "express";
import SellerRepository from "../repository/sellerRepo";
import jwt from "jsonwebtoken";

class SellerController {
  private sellerRepository: SellerRepository;

  constructor() {
    this.sellerRepository = new SellerRepository();
  }

  createAccount = async (req: Request, res: Response) => {
    const { mobile_number, otp } = req.body;

    try {
      const existingUser = await this.sellerRepository.getUserBY(
        "mobile_number",
        mobile_number
      );

      if (existingUser) {
        res
          .status(400)
          .json({
            error: "User with the same mobile number already exists.",
            existingUser,
          });
        return;
      }

      const userID = await this.sellerRepository.createAccount(
        mobile_number,
        otp
      );

      const token = jwt.sign({ id: userID, mobile_number }, "secret", {
        expiresIn: "1h",
      });

      res
        .status(201)
        .json({ message: "Account created successfully", token, userID });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  authtest = async (req: Request, res: Response) => {
    const userID = req.user.id;

    const user = await this.sellerRepository.getUserBY("id", userID);

    res.json({
      user: user,
      userID: userID,
    });
  };

  createStore = async (req: Request, res: Response) => {
    const { name, address } = req.body;

    if (!name || !address) {
      res.status(400).json({ error: "Store name and address are required." });
      return;
    }

    try {
      const storeLink = this.generateStoreLink(name);

      const storeID = await this.sellerRepository.createStore(
        name,
        address,
        req.user.id,
        storeLink
      );

      res.status(201).json({
        storeID,
        storeLink,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  private generateStoreLink(storeName: string):string{

    const cleanedStoreName = storeName.replace(/\s/g, "").toLowerCase();
    const randomString = Math.random().toString(36).substring(2, 10);
    return `http://${cleanedStoreName}-${randomString}`;
  }
}

export default new SellerController();
