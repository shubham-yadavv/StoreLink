import { Request, Response } from 'express';

class CartController {
  addToCart = async (req: Request, res: Response) => {
    try {
      const { productId, quantity, storeLink } = req.body;
      if (!productId || !quantity || !storeLink) {
        return res.status(400).json({ error: 'Invalid request' });
      }

      const userSession = req.session;

      if (!userSession.cart) {
        userSession.cart = [];
      }

      const existingCartItem = userSession.cart.find((item:any) => item.productId === productId && item.storeLink === storeLink);

      if (existingCartItem) {
        existingCartItem.quantity += quantity;
      } else {

        userSession.cart.push({ productId, quantity, storeLink });
      }

      res.status(200).json({ message: 'Item added to the cart', cart: userSession.cart });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: error.message });
    }
  }
}

export default new CartController();
