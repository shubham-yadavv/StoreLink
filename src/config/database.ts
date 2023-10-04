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
