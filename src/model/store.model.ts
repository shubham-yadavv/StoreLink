import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import Account from "./account.model";
import Product from "./product.model";

@Table({
  tableName: "store",
})
class Store extends Model<Store> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id",
  })
  storeId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: "store_name",
  })
  storeName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: "address",
  })
  address!: string;

  @ForeignKey(() => Account)
  @Column({
    type: DataType.INTEGER,
    field: "seller_id",
  })
  sellerId!: number;

  @BelongsTo(() => Account)
  seller!: Account;

  @HasMany(() => Product)
  products!: Product[];

  @Column({ type: DataType.STRING(255), allowNull: false, unique: true })
  store_link!: string;
}

export default Store;
