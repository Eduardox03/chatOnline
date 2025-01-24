const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
  name: String,
  firName: String,
  document: Number,
  email: String,
  birthdate: Date,
  user: String,
  status: { type: String, default: 'offline' }, // 'online' o 'offline'
  phoneNumber: Number,
  typeOfDocument: String,
  password: String,
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
  // Agregar el array de referencias a los mensajes
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }],
});

const User = mongoose.model('User', usersSchema);

module.exports = User;
