const sql = require("./db.js");

const Analytics = {};

Analytics.getUserProductPurchaseDetails = (result) => {
    const query = `
      SELECT
        p.title AS product_name,
        COUNT(DISTINCT o.user_id) AS num_users_ordered,
        COUNT(o.id) AS num_orders
      FROM
        products p
      JOIN
        orderdetails od ON p.id = od.product_id
      JOIN
        orders o ON od.order_id = o.id
      GROUP BY
        p.id
      ORDER BY
        num_users_ordered DESC, num_orders DESC
      LIMIT 10;
    `;
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("fetched user prodcut purchase details: ", { ...res });
        result(null, { ...res });
    });
};

Analytics.getUserOrderDetails = (year, result) => {
    if (!year) {
        year = 2023;
    }
    const query = `
    SELECT
      u.first_name AS user_name,
      COUNT(o.id) AS num_orders
    FROM
      users u
    JOIN
      orders o ON u.id = o.user_id
    WHERE
      YEAR(o.created_at) = ? 
    GROUP BY
        u.id, u.first_name
    ORDER BY
        num_orders DESC 
    LIMIT 10;
  `;

    sql.query(query, year, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("fetched user order details: ", { ...res });
        result(null, { ...res });
    });

};


Analytics.getOrderPercentages = (result) => {
    const query = `
    SELECT
        p.id AS product_id,
        p.title AS product_name,
        COUNT(o.id) AS num_orders,
        (COUNT(o.id) / (SELECT COUNT(*) FROM orders)) * 100 AS order_percentage
    FROM
        products p
    LEFT JOIN
        orderdetails od ON p.id = od.product_id
    LEFT JOIN
        orders o ON od.order_id = o.id
    GROUP BY
        p.id, p.title
    ORDER BY
        order_percentage DESC;`;

    
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("fetched order percentages: ", { ...res });
        result(null, { ...res });
    });
    
};

module.exports = Analytics;