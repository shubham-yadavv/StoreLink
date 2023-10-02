import Account from "../model/account.model";
import {Sequelize} from 'sequelize-typescript'


interface ISellerRepository {
    createAccount(mobileNumber: string): Promise<void>
}

class SellerRepository implements ISellerRepository{

    private sequelize: Sequelize

    constructor(sequelize: Sequelize) {
        this.sequelize = sequelize;
      }

    async createAccount(mobileNumber: string): Promise<void> {
        try {

        // const sql = 'INSERT INTO accounts (mobile_number) VALUES (:mobileNumber)';
        // await this.sequelize.query(sql, {
        //     replacements: { mobileNumber },
        //     // type: Sequelize.QueryTypes.INSERT,
        //   });

        console.log(mobileNumber)
        await Account.create({ mobileNumber: mobileNumber });
            
        } catch (error) {
            // thro`w new Error("Account creation failed");
            console.log(error)
        }
    }

}

export default SellerRepository