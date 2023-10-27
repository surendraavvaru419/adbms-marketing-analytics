const Product = require("../models/product.model.js");

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Product.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    else res.send(data);
  });
};

// Find a single Tutorial by Id
exports.findOne = (req, res) => {
    console.log("REQ IP: ", req.ip)
    Product.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found product with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving product with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};
