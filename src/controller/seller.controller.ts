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
      const existingUser = await this.sellerRepository.checkExistingUser(mobile_number);

      if (existingUser) {
        res.status(400).json({ error: "User with the same mobile number already exists." });
        return;
      }
      
      await this.sellerRepository.createAccount(mobile_number, otp);
      const token = jwt.sign({ mobile_number }, 'secretkey', { expiresIn: '1h' });

      res.status(201).json({ message: 'Account created successfully', token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new SellerController();