const sql = require("./db.js");

// constructor
const Product = function(product) {
  this.title = product.title;
  this.description = product.description;
  this.price = product.price;
};

Product.findById = (id, result) => {
  sql.query(`SELECT * FROM products WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found product: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found product with the id
    result({ kind: "not_found" }, null);
  });
};

Product.getAll = (title, result) => {
  let query = "SELECT * FROM products";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("products: ", res);
    result(null, res);
  });
};

module.exports = Product;
