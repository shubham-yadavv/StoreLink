import { Model, Table, Column, DataType, HasMany } from 'sequelize-typescript';
import Store from './store.model';
import Order from './order.model';

@Table({
    tableName: 'seller',
})
class Seller extends Model<Seller> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'seller_id',
    })
    sellerId!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: 'mobile_number',
    })
    mobileNumber!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: 'token',
    })
    token!: string;

    @HasMany(() => Store)
    stores!: Store[];

    @HasMany(() => Order)
    orders!: Order[];
}

export default Seller;
