import express, { Application, Request, Response } from "express";
const helmet = require("helmet");
import SellerRoutes from "./router/seller.route";
class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.plugins()
    this.routes()

  }

  protected plugins(): void {
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  protected routes(): void {
    this.app.get("/", (req: Request, res: Response) => {
      res.send("Hello world!");
    });

    this.app.use("/api/seller", SellerRoutes)
  }
}

const port = 3000;
const app = new App().app;

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
