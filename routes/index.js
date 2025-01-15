const users = require('./users/index');
const chat = require('./chats//index');
module.exports = (app) => {
  app.use('/api', users);
  app.use('/api', chat);
};
