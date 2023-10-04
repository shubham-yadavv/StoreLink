import Database from "../config/database";

interface ISellerRepository {
  createAccount(mobileNumber: string, otp: string): Promise<void>;
  getUserBY(parameterName: string, parameterValue: any): Promise<any | null>;
  createStore(
    name: string,
    address: string,
    seller_id: number,
    store_link: string
  ): Promise<any | null>;
}

class SellerRepository implements ISellerRepository {
  async createAccount(mobileNumber: string, otp: string): Promise<void> {
    try {
      const queryText =
        "INSERT INTO account (mobile_number, otp) VALUES ($1, $2) RETURNING id";
      const queryValues = [mobileNumber, otp];

      const result = await Database.query(queryText, queryValues);

      if (result.rowCount === 1) {
        console.log(result.rows[0]);
        return result.rows[0].id;
      } else {
        throw new Error("Failed to create a new seller account.");
      }
    } catch (error) {
      console.error("Error creating seller account:", error);
      throw error;
    }
  }

  async getUserBY(
    parameterName: string,
    parameterValue: any
  ): Promise<any | null> {
    try {
      const query = `SELECT * FROM account WHERE ${parameterName} = $1`;
      const val = [parameterValue];

      const result = await Database.query(query, val);

      if (result.rowCount === 1) {
        return result.rows[0];
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error retrieving user using parameter:", error);
      throw error;
    }
  }

  async createStore(
    name: string,
    address: string,
    seller_id: number,
    store_link: string
  ): Promise<any> {
    try {
      const queryText =
        "INSERT INTO store (name, address, seller_id, store_link) VALUES ($1, $2, $3, $4) RETURNING id";
      const queryValues = [name, address, seller_id, store_link];

      const result = await Database.query(queryText, queryValues);

      if (result.rowCount === 1) {
        console.log(result.rows[0]);
        return result.rows[0].id;
      } else {
        throw new Error("Failed to create a new store.");
      }
    } catch (error) {
      console.error("Error retrieving user using parameter:", error);
      throw error;
    }
  }
}

export default SellerRepository;
