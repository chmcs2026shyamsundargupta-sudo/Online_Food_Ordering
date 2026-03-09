import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import orderRoutes from "./routes/orderRoutes.js";
import { connectDB } from "./config/db.js";
import dns from "node:dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();
const app = express();
app.use(cors());
const port=process.env.PORT || 3000

app.use(express.json());
app.use("/orders", orderRoutes);

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`http://localhost:${port}/orders`);
    });
});
