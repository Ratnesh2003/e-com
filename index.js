import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import productRoutes from "./routes/products.js";


// CONFIGURATIONS
const app = express();
dotenv.config();
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(cors());

// ROUTES
app.use("/", productRoutes);


// MONGOOSE CONFIGURATION
const PORT = process.env.PORT;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

