import {
  Model,
  Table,
  Column,
  DataType,
  HasMany
} from "sequelize-typescript";

import Product from "./product.model";

@Table({
  tableName: "category",
})
class Category extends Model<Category> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id",
  })
  orderId!: number;

  @Column({ 
    type: DataType.STRING(255), 
    allowNull: false
 })
  name!: string;

  @HasMany(() => Product)
  products?: Product[];
}

export default Category;
