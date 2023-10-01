import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import sequelize from '../config/database';
import Category from './category.model';
import Store from './store.model';

@Table({
    tableName: 'product',
})
class Product extends Model<Product> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'product_id',
    })
    productId!: number;

    @ForeignKey(() => Category)
    @Column({
        type: DataType.INTEGER,
        field: 'category_id',
    })
    categoryId!: number;

    @BelongsTo(() => Category)
    category!: Category;

    @ForeignKey(() => Store)
    @Column({
        type: DataType.INTEGER,
        field: 'store_id',
    })
    storeId!: number;

    @BelongsTo(() => Store)
    store!: Store;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: 'product_name',
    })
    productName!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: 'description',
    })
    description!: string;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
        field: 'mrp',
    })
    MRP!: number;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
        field: 'sale_price',
    })
    salePrice!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: 'image',
    })
    image!: string;
}

export default Product;
