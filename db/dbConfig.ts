import { DataSource } from "typeorm";
import { Shop } from "./entities/Shop";
import { Product } from "./entities/Product";
import { Category } from "./entities/Category";
import { Hotline } from "./entities/Hotline";


const dataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "mydb",
    synchronize: true,
    dropSchema: true,
    logging: false,
    entities: [Shop, Product, Category, Hotline]
})

export default dataSource;