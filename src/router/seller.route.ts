import BaseRoutes from "./base/BaseRouter";
import SellerController from "../controller/seller.controller";
import { authenticateJWT } from "../middleware/auth";


class SellerRoutes extends BaseRoutes{
    public routes(): void {
        this.router.post("/signup", SellerController.createAccount);
        this.router.get("/test",authenticateJWT, SellerController.authtest)
        this.router.post("/store/create",authenticateJWT, SellerController.createStore)
      }
}

export default new SellerRoutes().router