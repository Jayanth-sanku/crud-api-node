const mongoose = require("mongoose");
const express = require("express");
const app = express();
const Product = require('./models/product.models.js');

app.use(express.json());

// Start the Express server
app.listen(3000, () => {
  console.log("Port Listening");
});

// GET API to fetch all products
app.get("/api/products", async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find();
    res.json(products); // Send the products as JSON response
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Error fetching products"); // Handle error with appropriate status code
  }
});

// GET API to fetch a specific product by ID
app.get("/api/products/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    // Find the product by ID in the database
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.json(product); // Send the product as JSON response
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).send("Error fetching product"); // Handle error with appropriate status code
  }
});

// PUT API to update a specific product by ID
app.put("/api/products/:id", async (req, res) => {
  const productId = req.params.id;
  const updateData = req.body;
  try {
    // Find the product by ID in the database and update it
    const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });
    if (!updatedProduct) {
      return res.status(404).send("Product not found");
    }
    res.json(updatedProduct); // Send the updated product as JSON response
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send("Error updating product"); // Handle error with appropriate status code
  }
});


// POST API to create a new product
app.post("/api/products", async (req, res) => {
  try {
    // Create a new product based on the request body
    const product = await Product.create(req.body);
    console.log("New product created:", product);
    res.status(201).json(product); // Send the newly created product as JSON response with status code 201 (Created)
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).send("Error creating product"); // Handle error with appropriate status code
  }
});


// DELETE API to delete a specific product by ID
app.delete("/api/products/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    // Find the product by ID in the database and delete it
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).send("Product not found");
    }
    res.json(deletedProduct); // Send the deleted product as JSON response
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send("Error deleting product"); // Handle error with appropriate status code
  }
});



mongoose.connect(
  "mongodb+srv://jayanthsanku324:E4DFjsa0sHCyXiYh@nodejscrud.itjgaih.mongodb.net/?retryWrites=true&w=majority&appName=NodeJsCRUD"
)
.then(() => {
  console.log("Connected to MongoDB successfully!");
})
.catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});
