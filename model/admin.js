const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminPost = new Schema({
  username: String,
  password: String,
});
AdminDo=mongoose.model('admin',AdminPost)
module.exports=AdminDo
