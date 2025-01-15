const chat = require('../../database/Models/chat');

const chatCreate = async (messagedata) => {
  try {
    const InsertChat = new chat(messagedata);
    await InsertChat.save();

    return InsertChat;
  } catch (error) {
    throw new Error('Error send email:', error.message);
  }
};

const chatList = async (userIdsend, userReceivcer) => {
  return await chat
    .find({
      $or: [
        { send: userIdsend, receivermessage: userReceivcer },
        { send: userReceivcer, receivermessage: userIdsend },
      ],
    })
    .populate('send', 'name user')
    .populate('receivermessage', 'name user');
};

const updateChat = async (chatId, userIdsend, userReceivcer, data) => {
  try {
    const chatMessage = await chat.findOne({
      _id: chatId,
      $or: [
        { send: userIdsend, receivermessage: userReceivcer },
        { send: userReceivcer, receivermessage: userIdsend },
      ],
    });

    if (!chatMessage) {
      throw new Error('chat not  foud');
    }

    const updatedChat = await chat.findByIdAndUpdate(
      chatId,
      {
        send: data.send,
        textMessage: data.textMessage,
        timesTap: data.timesTap,
        messageType: data.messageType,
        status: data.status,
        receivermessage: data.receivermessage,
      },
      { new: true }
    );

    if (!updatedChat) {
      throw new Error('Error al actualizar el chat');
    }

    return updatedChat;
  } catch (error) {
    console.log('Error al actualizar el chat', error.message);
    throw new Error(error.message);
  }
};

module.exports = { chatCreate, chatList, updateChat };
