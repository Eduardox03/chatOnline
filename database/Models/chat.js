const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
  // usuario que envia el mensaje
  send: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  // Mensaje de texto
  textMessage: String,
  // Fecha y hora del mensaje
  timesTap: { type: Date, default: Date.now },
  // Tipo de mensaje (texto, imagen.)
  messageType: String,
  // Estado del mensaje (enviado, leído.)
  status: String,
  // usuario que recive el mensaje
  receivermessage: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
