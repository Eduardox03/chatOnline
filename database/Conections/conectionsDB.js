const mongoose = require('mongoose');
require('dotenv').config();

const ConnectionsDB = async () => {
  try {
    await mongoose.connect(process.env.URL_MONGODB, { ssl: true });
    console.log('Conexión exitosa a la base de datos');

    // Listening for the open event after successful connection
    mongoose.connection.once('open', () => {
      console.log('Connections db open');
    });
  } catch (error) {
    console.log('Error connections db:', error);
  }
};

// Event listeners for error and disconnected events
mongoose.connection.on('error', (err) => {
  console.error('Error in the connnections MongoDB:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Conenections MongoDB disconnected');
});

module.exports = ConnectionsDB;
