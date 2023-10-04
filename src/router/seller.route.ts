import BaseRoutes from "./base/BaseRouter";
import SellerController from "../controller/seller.controller";


class SellerRoutes extends BaseRoutes{
    public routes(): void {
        this.router.post("/signup", SellerController.createAccount);
      }
}

export default new SellerRoutes().router