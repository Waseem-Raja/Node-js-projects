const mongoose=require('mongoose');
//creating schema for book directory
const bookdirectory= new mongoose.Schema({
    title:String,
    author:String,
    isbn:String
});

//creating model

const book= mongoose.model('book',bookdirectory);
module.exports={book};