module.exports = app => {
    const analytics = require("../controllers/analytics.controller.js");

    var router = require("express").Router();

    // Get user purchase analytics
    router.get("/userpurchases", analytics.userProductPurcahses);

    // Get user order analytics
    router.get("/userorderdetails/", analytics.userOrderDetails);

    // Get order percentage analytics
    router.get("/orderpercentages", analytics.orderPercentages);


    app.use('/api/analytics', router);
};
