const { Schema, model } = require("mongoose")

const Product = new Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    measurement: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },

})

module.exports = model("Product", Product)