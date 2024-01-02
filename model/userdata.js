const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserPost = new Schema({
  username: String,
  password: String
});
UserDo=mongoose.model('userdata',UserPost)
module.exports=UserDo