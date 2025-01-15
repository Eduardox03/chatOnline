const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
  send: mongoose.Schema.Types.ObjectId,
  textMessage: String,
  timesTap: Date,
  messsageType: String,
  status: String,
  sendBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
});

const chat = mongoose.model('chat', chatSchema);

module.exports = chat;
