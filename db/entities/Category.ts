import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, BaseEntity } from "typeorm";
import { Product } from "./Product";

@Entity("category")
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ length: 255 })
  name!: string;

  @ManyToMany(() => Product, (product) => product.categories)
  products!: Product[];
}
