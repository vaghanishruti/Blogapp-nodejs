const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPost = new Schema({
  title: String,
  description: String,
  category:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category"},
  author:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userdata"},
  image:String
});

BlogDo=mongoose.model('blog',BlogPost)
module.exports=BlogDo