const {
    default: mongoose
} = require("mongoose");

//creating schema
const urlshchema = new mongoose.Schema({

    fullurl: String,
    shorturl: String,
    clicks: {
        type:Number,
        default:0
    }

});

//creating model

const urlshortnermodel= mongoose.model("urlshortner",urlshchema);

module.exports={urlshortnermodel};