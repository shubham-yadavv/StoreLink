import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import Store from "./store.model";
import Customer from "./customer.model";

@Table({
  tableName: "orders",
})
class Order extends Model<Order> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id",
  })
  orderId!: number;

  @ForeignKey(() => Store)
  @Column({
    type: DataType.INTEGER,
    field: "store_id",
  })
  storeId!: number;

  @BelongsTo(() => Store)
  store!: Store;

  @ForeignKey(() => Customer)
  @Column({
    type: DataType.INTEGER,
    field: "customer_id",
  })
  customerId!: number;

  @BelongsTo(() => Customer)
  customer!: Customer;
}

export default Order;
