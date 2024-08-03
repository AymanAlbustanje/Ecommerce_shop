import express, { Express } from "express";
import dataSource from "./db/dbConfig";
import shopRoutes from "./routes/shop";
import productRoutes from "./routes/product";
import categoryRoutes from "./routes/category";
import hotlineRoutes from "./routes/hotline";
import { customErrorHandler, DefaultErrorHandler } from "./middleware/errorHandler";

const app: Express = express();
const PORT: number = 3000;

app.use(express.json());


app.use("/shops", shopRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/hotlines", hotlineRoutes);


app.use(customErrorHandler);
app.use(DefaultErrorHandler);

dataSource
  .initialize()
  .then(() => {
    console.log('Connected to DB');
  })
  .catch(err => {
    console.error('Failed to connect to DB: ' + err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
