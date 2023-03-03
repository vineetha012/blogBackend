const mongoose = require("mongoose");
const Schema=mongoose.Schema;
const blogSchema = new mongoose.Schema({
    title:{type:String,required:true},
    Image: {type:String,required:true},
    comments: {type:Array},
    Description:{type:String},
    created_at:{type:String},
    userref: [{type: Schema.Types.ObjectId, ref: 'User'}]

},{timestamps:true});
const blog_model = mongoose.model("blogs", blogSchema);
module.exports = blog_model;