import BaseRoutes from "./base/BaseRouter";
import accountController from "../controller/account.controller";
import storeController from "../controller/store.controller";
import productController from "../controller/product.controller";
import orderController from "../controller/order.controller";
import { authenticateJWT } from "../middleware/auth";

class SellerRoutes extends BaseRoutes {
  public routes(): void {

      this.router.post("/signup", accountController.createAccount);
    this.router.get("/test", authenticateJWT, accountController.authtest);

    this.router.post("/store/create", authenticateJWT, storeController.createStore);

    this.router.post("/inventory", authenticateJWT, productController.createInventory);

    this.router.post("/orders/accept", authenticateJWT, orderController.acceptOrder);
  }
}

export default new SellerRoutes().router;
