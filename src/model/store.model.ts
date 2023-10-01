import { Model, Table, Column, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import Seller from './seller.model'; 
import Product from './product.model'; 

@Table({
    tableName: 'store', 
})
class Store extends Model<Store>{
    @Column({
        type: DataType.INTEGER, 
        primaryKey: true, 
        autoIncrement: true, 
        field: 'store_id', 
    })
    storeId!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: 'store_name', 
    })
    storeName!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false, 
        field: 'address',
    })
    address!: string;

    @ForeignKey(() => Seller)
    @Column({
        type: DataType.INTEGER, 
        field: 'seller_id',
    })
    sellerId!: number;

    @BelongsTo(() => Seller)
    seller!: Seller;

    @HasMany(() => Product)
    products!: Product[];

}

export default Store;
