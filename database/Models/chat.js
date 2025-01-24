const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
  send: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Usuario que envía el mensaje
  textMessage: String, // El texto del mensaje
  timesTap: { type: Date, default: Date.now }, // Fecha y hora del mensaje
  messageType: { type: String, enum: ['text', 'image', 'file'], default: 'text' }, // Tipo de mensaje
  status: { type: String, enum: ['sent', 'delivered', 'read'], default: 'sent' }, // Estado del mensaje
  receivermessage: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Usuario que recibe el mensaje
  online: { type: Boolean, default: false }, // Estado en línea de la persona que recibe el mensaje
  lastMessage: String, // Último mensaje que el usuario ha recibido
  lastMessageDate: { type: Date, default: Date.now }, // Fecha del último mensaje recibido
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
