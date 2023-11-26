const sql = require("./db.js");

// constructor
const OrderDetail = function(orderDetail) {
  this.order_id = orderDetail.order_id;
  this.product_id = orderDetail.product_id;
};

OrderDetail.create = (newOrderDetail, result) => {
  sql.query("INSERT INTO orderdetails SET ?", newOrderDetail, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created order detail: ", { id: res.insertId, ...newOrderDetail });
    result(null, { id: res.insertId, ...newOrderDetail });
  });
};

OrderDetail.findById = (id, result) => {
  sql.query(`SELECT * FROM orderdetails WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found order detail: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found order detail with the id
    result({ kind: "not_found" }, null);
  });
};

OrderDetail.getAll = (result) => {
  let query = "SELECT * FROM orderdetails";
  
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("order details: ", res);
    result(null, res);
  });
};

OrderDetail.updateById = (id, orderDetail, result) => {
  sql.query(
    "UPDATE orderdetails SET order_id = ?, product_id = ? WHERE id = ?",
    [orderDetail.order_id, orderDetail.product_id, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Oder Detail with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated order detail: ", { id: id, ...orderDetail });
      result(null, { id: id, ...orderDetail });
    }
  );
};

OrderDetail.remove = (id, result) => {
  sql.query("DELETE FROM orderdetails WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Order Detail with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted order detail with id: ", id);
    result(null, res);
  });
};

OrderDetail.removeAll = result => {
  sql.query("DELETE FROM orderdetails", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} orders`);
    result(null, res);
  });
};

module.exports = OrderDetail;
