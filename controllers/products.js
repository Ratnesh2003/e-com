import Product from "../models/Product.js";

// CREATE
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, countInStock, imageUrl } = req.body;
        const productExist =  await Product.findOne({ name });
        if (productExist !== null) {
            throw new Error("Product with this name already exists");
        }
            
        const product = new Product({
            name,
            description,
            price,
            countInStock,
            imageUrl,
        });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

// READ
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// UPDATE
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, countInStock, imageUrl } = req.body;
        const product = await Product.findById(id);
        if (product === null) {
            throw new Error("Product with this id does not exist");
        }
        const updatedProduct = { name, description, price, countInStock, imageUrl, _id: id };
        await Product.findByIdAndUpdate(id, updatedProduct, { new: true });
        res.status(200).json(updatedProduct);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// DELETE
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (product === null) {
            throw new Error("Product with this id does not exist");
        }
        await Product.findByIdAndRemove(id);
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}