//this cars.js file will handle all of our routes related to cars
const express = require("express");
const router = express.Router();


//here we can hide or remove the first part of end points
// which is /cars as its already knowing when control enters to this file
router.
get("/whitecars", (req, res) => {

    res.send("get all white cars here ");
})

router
    .get("/:carid", (req, res) => {

        res.send("got a particular car over here");
    })

module.exports = router;