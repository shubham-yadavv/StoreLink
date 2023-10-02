import express, { Application, Request, Response } from "express";
import Database from "./config/database";
import SellerRepository from "./repository/sellerRepo";
const helmet = require("helmet");

class App {
  public app: Application;
  private database: Database;
  private sellerRepository: SellerRepository;

  constructor() {
    this.app = express();
    this.plugins()
    this.routes()

    this.database = new Database();

    this.sellerRepository = new SellerRepository(this.database.sequelize);

    const sampleMobileNumber = '1234567890';
    this.sellerRepository
      .createAccount(sampleMobileNumber)
      .then(() => {
        console.log("Account created successfully.");
      })
      .catch((error) => {
        console.error("Error creating account:", error);
      });

      this.databaseSync();

  }
  protected databaseSync(): void {
    const db = new Database();
    db.sequelize?.sync();
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
  }
}

const port = 3000;
const app = new App().app;

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
