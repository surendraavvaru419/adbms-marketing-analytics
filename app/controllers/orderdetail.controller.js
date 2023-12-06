const Order = require("../models/order.model.js");
const OrderDetail = require("../models/orderdetail.model.js");

// Retrieve all Order Details from the database (with condition).
exports.findAll = (req, res) => {

  OrderDetail.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Order Details."
      });
    else res.send(data);
  });
};

// Find a single Order Detail by Id
exports.findOne = (req, res) => {
  console.log("REQ IP: ", req.ip)
  OrderDetail.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found order detail with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving order detail with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};


// Create and Save a new Order Detail
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Order Detail
  const orderDetail = new OrderDetail({
    order_id: req.body.order_id,
    product_id: req.body.product_id
  });

  // Save Order Detail in the database
  OrderDetail.create(orderDetail, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Order Detail."
      });
    else res.send(data);
  });
};


// Update a Order Detail identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  OrderDetail.updateById(
    req.params.id,
    new OrderDetail(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Order Detail with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Order Detail with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Order Detail with the specified id in the request
exports.delete = (req, res) => {
  OrderDetail.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Order Detail with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Order Detail with id " + req.params.id
        });
      }
    } else res.send({ message: `Order Detail was deleted successfully!` });
  });
};

// Delete all Order Detail from the database.
exports.deleteAll = (req, res) => {
  OrderDetail.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all order Details."
      });
    else res.send({ message: `All Order Details were deleted successfully!` });
  });
};
