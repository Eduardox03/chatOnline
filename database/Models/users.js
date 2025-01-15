const mongoose = require('mongoose');
const usersSchema = mongoose.Schema({
  name: String,
  firName: String,
  document: Number,
  email: String,
  birthdate: Date,
  user: String,
  status: String,
  phoneNumber: Number,
  typeOfDocument: String,
  password: String,
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
});
const user = mongoose.model('user', usersSchema);

module.exports = user;
