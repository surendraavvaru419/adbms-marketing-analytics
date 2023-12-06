module.exports = app => {
    const products = require("../controllers/product.controller.js");

    var router = require("express").Router();

    // Retrieve all products
    router.get("/", products.findAll);

    // Retrieve a single product with id
    router.get("/:id", products.findOne);

    // Create and save new Product
    router.post("/", products.create);

    // Update a Product with id
    router.put("/:id", products.update);

    // Delete a Product with id
    router.delete("/:id", products.delete);

    // Delete all Products
    router.delete("/", products.deleteAll);


    app.use('/api/products', router);
};
