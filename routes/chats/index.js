const express = require('express');
const { chatCreate, chatList, updateChat } = require('../../Services/chat/chat');
const router = express.Router();

router.post('/chat', async (req, res) => {
  const messagechat = req.body;
  try {
    const response = await chatCreate(messagechat);
    if (!response) {
      throw new Error('Not_Send_Message');
    }
    return res.status(200).json(response);
  } catch (error) {
    let Estado = 500;
    if (error.message === 'Not_Send_Message') {
      Estado = 400;
    }
    return res.status(Estado).json(error.message);
  }
});

router.get('/chat/', async (req, res) => {
  const { userIdsend, userReceivcer } = req.query;

  try {
    if (!userIdsend || !userReceivcer) {
      throw new Error('chat_NOT_Exit');
    }

    // Obtener los mensajes entre el usuario que envió y el que recibió
    const response = await chatList(userIdsend, userReceivcer);

    if (!response || response.length === 0) {
      throw new Error('MESSAGE_NOT_FOUND');
    }

    return res.status(200).json(response);
  } catch (error) {
    let statusCode = 500;
    if (error.message === 'MESSAGE_NOT_FOUND') {
      statusCode = 400;
    }
    return res.status(statusCode).json({ message: error.message });
  }
});

router.put('/chat/', async (req, res) => {
  const { chatid, userIdsend, userReceivcer } = req.query;

  try {
    if (!userIdsend || !userReceivcer) {
      throw new Error('chat_NOT_Exit');
    }
    const data = req.body;
    // Obtener los mensajes entre el usuario que envió y el que recibió
    const response = await updateChat(chatid, userIdsend, userReceivcer, data);

    if (!response || response.length === 0) {
      throw new Error('MESSAGE_NOT_FOUND');
    }

    return res.status(200).json(response);
  } catch (error) {
    let statusCode = 500;
    if (error.message === 'MESSAGE_NOT_FOUND') {
      statusCode = 400;
    }
    return res.status(statusCode).json({ message: error.message });
  }
});

module.exports = router;
