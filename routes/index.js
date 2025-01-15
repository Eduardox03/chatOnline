const users=require('./users/index')
  
module.exports = (app) => {
    app.use('/api', users);
    
  };


 