// import { Sequelize } from "sequelize-typescript";
// import * as dotenv from "dotenv";
// import Store from "../model/store.model"
// import Account from "../model/account.model"
// import Customer from "../model/customer.model"
// import Category from "../model/category.model"
// import Order from "../model/order.model"
// import Product from "../model/product.model";
// dotenv.config();

// class Database{
//     public sequelize: Sequelize | undefined

//     private POSTGRES_DB= process.env.POSTGRES_DB as string
//     private POSTGRES_HOST= process.env.POSTGRES_HOST as string
//     private POSTGRES_PORT= process.env.POSTGRES_PORT as unknown as number
//     private POSTGRES_USER= process.env.POSTGRES_USER as unknown as string
//     private POSTGRES_PASSWORD= process.env.POSTGRES_PASSWORD as unknown as string

//     constructor(){
//         this.connectToPostgreSQL();
//     }

//     private async connectToPostgreSQL(){
//         this.sequelize = new Sequelize({
//             database: this.POSTGRES_DB,
//             username: this.POSTGRES_USER,
//             password: this.POSTGRES_PASSWORD,
//             host: this.POSTGRES_HOST,
//             port: this.POSTGRES_PORT,
//             dialect: 'postgres',
//             models: [Store,Account,Order, Product, Category, Customer]
//         });

//         await this.sequelize.authenticate().then(()=>{
//             console.log("postgreSQL connection has established sucuessfully")
//         })
//         .catch((err)=>{
//             console.log("error connecting to the database")
//         })

//     }

// }

// export default Database;

import { Pool, PoolConfig } from "pg";
import dotenv from "dotenv";
dotenv.config();

class Database {
  private static instance: Database;
  private pool: Pool;

  private constructor() {
    this.pool = this.createPool();
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  private createPool(): Pool {
    const poolConfig: PoolConfig = {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT as unknown as number,
      database: process.env.DB_DATABASE || "dukaan",
      max: 20,
      connectionTimeoutMillis: 0,
      idleTimeoutMillis: 3000,
    };

    const pool = new Pool(poolConfig);

    pool.on("error", (err) => {
      console.error("Database error:", err);
      process.exit(-1);
    });

    return pool;
  }

  public async query(text: string, values?: any[]): Promise<any> {
    try {
      const result = await this.pool.query(text, values);
      return result;
    } catch (error) {
      console.error("Database query error:", error);
      throw error;
    }
  }
}

export default Database.getInstance();


// export const pool = new Pool({
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   database: process.env.DB_DATABASE || "dukaan",
//   max: 20,
//   connectionTimeoutMillis: 0,
//   idleTimeoutMillis: 3000,
// });

// pool.on("error", (err: any) => {
//   console.log("error ", err);
//   process.exit(-1);
// });
