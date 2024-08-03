import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, BaseEntity, JoinColumn } from "typeorm";
import { Shop } from "./Shop";
import { Category } from "./Category";

@Entity("product")
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ length: 255 })
  name!: string;

  @Column('decimal')
  price!: number;

  @ManyToOne(() => Shop, (shop) => shop.products)
  @JoinColumn({ name: 'shop_Id', referencedColumnName: 'id' })
  shop!: Shop;

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable()
  categories!: Category[];
}
