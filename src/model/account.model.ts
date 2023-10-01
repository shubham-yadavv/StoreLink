import { Model, Table, Column, DataType, HasMany } from 'sequelize-typescript';
import Store from './store.model';
import Order from './order.model';

@Table({
    tableName: 'account',
})
class Account extends Model<Account> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id',
    })
    id!: number;

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

}

export default Account;
