import BaseRoutes from "./base/BaseRouter";
import { authenticateJWT } from "../middleware/auth";
import storeController from "../controller/store.controller";
import productController from "../controller/product.controller";
import cartController from "../controller/cart.controller";
import orderController from "../controller/order.controller";
import customerController from "../controller/customer.controller";


class BuyerRoutes extends BaseRoutes{
    public routes(): void {
        this.router.get("/store/details", storeController.getStoreDetails)
        this.router.get("/products/catalog", productController.getProductCatalog)

        
        // Add Items to Cart
        this.router.post("/cart/add", cartController.addToCart)
        
        
        this.router.post("/customer", customerController.createCustomer)
        // Place an Order
        this.router.post("/order/place",authenticateJWT, orderController.placeOrder)




      }
    
}
export default new BuyerRoutes().router