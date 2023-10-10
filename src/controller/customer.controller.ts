import { Request, Response } from "express";
import Database from "../config/database";

class OrderController{
    accetOrder(req: Request, res: Response ){
        const {customerDetails, orderData }= req.body
        try {
            
            // create customer

            
        } catch (error) {
            
        }
    }

}
export default new OrderController()