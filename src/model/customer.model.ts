import { Model, Table, Column, DataType, HasMany } from 'sequelize-typescript';
import Order from './order.model';

@Table({
    tableName: 'customer',
})
class Customer extends Model<Customer> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'customer_id',
    })
    customerId!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: 'mobile_number',
    })
    mobileNumber!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: 'address',
    })
    address!: string;

    @HasMany(() => Order)
    orders!: Order[];
}

export default Customer;
