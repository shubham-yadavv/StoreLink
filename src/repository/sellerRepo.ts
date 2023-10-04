import Database from "../config/database";

interface ISellerRepository {
  createAccount(mobileNumber: string, otp: string): Promise<void>;
  checkExistingUser(mobile_number: string): Promise<any | null>;
}

class SellerRepository implements ISellerRepository {
  async createAccount(mobileNumber: string, otp: string): Promise<void> {
    try {
      const queryText = "INSERT INTO account (mobile_number, otp) VALUES ($1, $2) RETURNING id";
      const queryValues = [mobileNumber, otp];

      const result = await Database.query(queryText, queryValues);
      console.log(result.rows[0].id)

    } catch (error) {
      console.error("Error creating seller account:", error);
      throw error;
    }
  }

  async checkExistingUser(mobile_number: string): Promise<any | null> {
    try {

      const checkUserQuery = "SELECT * FROM account WHERE mobile_number = $1"
      const val = [mobile_number]
      const result = await Database.query(checkUserQuery, val)
      if (result.rowCount !== 0) {
        throw new Error("User with the same mobile number already exists.");
      }
    } catch (error) {
      console.error("Error retrieving user using mobile number:", error);
      throw error;
    }
  }
}

export default SellerRepository;
