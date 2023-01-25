//reference link: https://expressjs.com/en/guide/routing.html
const express = require("express");
const app = express();
require('dotenv').config;


/*express.Router
Use the express.Router class to create 
modular, mountable route handlers. 
A Router instance is a
complete middleware and routing system;
 for this reason, it is often referred to as a “mini-app”.
*/
const cars = require("./Routes/cars")
app.use("/cars", cars); //use cars.js file to handle
// requests that starts with /cars

//home route
app.get("/", (req, res) => {

    res.send("home");
})


//route chaining
// chaining routes having same end points but differ in http requests
//for example we have here bikes routes
//before chaining
/*
app.get("/bikes", (req, res) => {

    res.send("home");
})
app.post("/bikes", (req, res) => {

    res.send("bikes got posted");
})*/

//after chaining
/*
app.route("/bikes")
    .get( (req, res) => {

        res.send("bikes are here");
    })
    .post( (req, res) => {

        res.send("bikes got posted");

    })
*/

app.listen(process.env.port, () => {
    console.log("server is listening")
})