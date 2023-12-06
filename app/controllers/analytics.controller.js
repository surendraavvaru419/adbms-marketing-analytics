const Analytics = require("../models/analytics.model.js");

exports.userProductPurcahses = (req, res) => {
    Analytics.getUserProductPurchaseDetails((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving product purchase details."
            });
        else res.send(data);
    });
};

exports.userOrderDetails = (req, res) => {

    Analytics.getUserOrderDetails(req.query.year, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while fetching order details."
            });
        else res.send(data);
    });
};

exports.orderPercentages = (req, res) => {
    Analytics.getOrderPercentages((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while fetching order percentages."
            });
        else res.send(data);
    });
};