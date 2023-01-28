const express = require("express");
const mongoose=require("mongoose");
const app = express();
require("dotenv").config();
const schema = require("./Models/schema")
const alert = require("alert");
var randomString = require('random-string');

// connection with the database using mongoose
mongoose.connect(process.env.mongourl, {
        useNewUrlParser: true
    }).then(() => console.log("connection Established with the Database"))
    .catch((err) => console.log(err));



//(parsing the req data )
app.use(express.urlencoded({
    extended: true
}));

//ejs Stuff
//ejs (setting template engine)
app.set('view engine', 'ejs');


//main point
app.get("/", async (req, res) => {

    const shortUrls=await schema.urlshortnermodel.find();
    res.render('index',{
        shortUrls:shortUrls
    });
})

app.post("/originalurl", async (req, res) => {

    if(req.body.fullUrl!=""){
    //store the original url in the db
    let shorturll=randomString();
    const data = new schema.urlshortnermodel({
        fullurl: req.body.fullUrl,
        shorturl: shorturll
    });
    console.log(shorturll+" "+ req.body.fullUrl);
    await data.save();
    res.redirect("/");
}
else{
    alert("please enter the url first ");
res.redirect("/");
}

})

app.get("/:shortedurl", async (req, res) => {

    const shortUrl = await schema.urlshortnermodel.findOne({
        shorturl: req.params.shortedurl
    })
    if (shortUrl == null) {
        alert("no record found");
        res.redirect("/")
    } else {
        shortUrl.clicks++
        shortUrl.save()
        res.redirect(shortUrl.fullurl)
    }


})
app.listen(process.env.port, () => {
    console.log("server is listening");
})