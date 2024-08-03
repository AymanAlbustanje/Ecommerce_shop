import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Shop } from "./Shop";

@Entity("hotline")
export class Hotline extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 255 })
    hotlineNumber!: string;

    @OneToOne(() => Shop, shop => shop.hotline)
    @JoinColumn({ name: 'shopId' })
    shop!: Shop;
}
