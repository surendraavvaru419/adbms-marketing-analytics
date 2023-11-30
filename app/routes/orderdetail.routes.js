module.exports = app => {
    const orderDetails = require("../controllers/orderdetail.controller.js");

    var router = require("express").Router();

    // Retrieve all order details
    router.get("/", orderDetails.findAll);

    // Retrieve a single order detail with id
    router.get("/:id", orderDetails.findOne);

    // Create and save new order detail
    router.post("/", orderDetails.create);

    // Update a order detail with id
    router.put("/:id", orderDetails.update);

    // Delete a order detail with id
    router.delete("/:id", orderDetails.delete);

    // Delete all order details
    router.delete("/", orderDetails.deleteAll);


    app.use('/api/orderdetails', router);
};
