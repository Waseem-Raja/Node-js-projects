const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schema = require("./schemas");
const {
    title
} = require("process");
app.use(bodyParser.urlencoded({
    extended: true
}));



//connection with the database using mongoose
mongoose.connect('mongodb://localhost:27017/Bookdirectory', {
        useNewUrlParser: true //to avoid warnings/erros
    }).then(() => console.log("connection Established with the Database"))
    .catch((err) => console.log(err));
//endpoints


//fetching all books
app.get("/allbooks",async (req,res)=>{

    let data=await schema.book.find();
    res.send(data);
})

// inserting a book
app.post("/insertbook", async (req, res) => {

    let booktitle = req.body.title;
    let bookauthor = req.body.author;
    let bookisbn = req.body.isbn;
    // console.log(bookauthor + " " + booktitle);
    // if book is already 
    let presentbook=schema.book.find({
        $or: [{
            title: booktitle 
        }, {
            isbn: bookisbn
        }]
})
if(presentbook==null){
    let data = new schema.book({
        title: booktitle,
        author: bookauthor,
        isbn: bookisbn
    });

    let sucess = await data.save().then(() => res.status(200).send("book inserted sucessfully"))
        .catch(() => res.status(404).send(err));

}
else
{
    res.send("can't insert as book is already present");
}
})
// fetching a particular book
app.get("/book/:isbn", (req, res) => {

    schema.book.findOne({
        isbn: req.params.isbn
    }, (err, data) => {
        if (err)
            res.send(err);
        else if (data == null)
            res.send(`there is no such book with isbn no. ${req.params.isbn}`)
        else
            res.send(data);
    })

})

//deleting a particular book
app.delete("/book/:isbn", (req, res) => {

    schema.book.findOne({
        isbn: req.params.isbn
    }, async (err, data) => {
        if (err)
            res.send(err);
        else if (data == null)
            res.send(`there is no such book with isbn no. ${req.params.isbn}`)
        else {
            let data = await schema.book.deleteOne({
                isbn: req.params.isbn
            });

            res.send("book deleted");

        }
    })

})

//updating a book
app.put("/book/:isbn", (req, res) => {

    let booktitle = req.body.title;
    let bookauthor = req.body.author;
    let bookisbn = req.body.isbn;
    schema.book.findOne({
        isbn: req.params.isbn
    }, (err, data) => {
        if (err)
            res.send(err);
        else if (data == null)
            res.send(`there is no such book with isbn no. ${req.params.isbn}`)
        else {
            let data = schema.book.updateOne({
                isbn: req.params.isbn
            }, {
                title: booktitle,
                author: bookauthor,
                isbn: bookisbn
            })
            res.send("book updated");
        }
    })

})
app.listen(80, () => {
    console.log("server is listening");
})