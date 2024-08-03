import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, BaseEntity, BeforeInsert } from "typeorm";
import { Product } from "./Product";
import { Hotline } from "./Hotline";
import * as bcrypt from "bcryptjs";

@Entity("shop")
export class Shop extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ length: 255 })
  shopName!: string;

  @Column({ length: 255 })
  email!: string;

  @Column({ length: 255 })
  password!: string;

  @OneToMany(() => Product, (product) => product.shop)
  products!: Product[];

  @OneToOne(() => Hotline, (hotline) => hotline.shop)
  @JoinColumn()
  hotline!: Hotline;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
