import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import userRouter from "./routes/userRoutes.js";
import categoryRouter from "./routes/categorRoutes.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection successful!!!"));

app.use(cors());
app.use(morgan("dev"));

// Body parser
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome all!!!");
});

app.use("/users", userRouter);
app.use("/category", categoryRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);

app.listen(PORT, () =>
  console.log(`The server is connected to port: ${PORT} 😎`)
);
