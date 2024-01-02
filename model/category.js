const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CatPost = new Schema({
  name: String,
  image: String,
});
CatDo=mongoose.model('category',CatPost)
module.exports=CatDo