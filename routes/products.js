import express from "express";
import {getAllProducts, createProduct, updateProduct, deleteProduct} from "../controllers/products.js";

const router = express.Router();

// READ
router.get("/", getAllProducts);

// CREATE
router.post("/create", createProduct);

// UPDATE
router.put("/update/:id", updateProduct);

// DELETE
router.delete("/delete/:id", deleteProduct);

export default router;