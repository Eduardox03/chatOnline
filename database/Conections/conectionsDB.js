const mongoose = require('mongoose');
require('dotenv').config();
const user = require('../Models/users');
const ConnectionsDB = async () => {
  try {
    await mongoose.connect(process.env.URL_MONGODB, {
      ssl: true,
    });
    user.watch().on('change', (data) => {
      if (data.operationType === 'update') {
        // Los cambios se encuentran en 'updateDescription.updatedFields'
        console.log('Campos modificados:', data.updateDescription.updatedFields);
      } else {
        console.log('Cambio:', data);
      }
    });
    console.log('Conexión exitosa a la base de datos');
  } catch (error) {
    console.log('Error en la conexión a la base de datos:', error);
  }
};

mongoose.connection.on('error', (err) => {
  console.error('Error en la conexión MongoDB:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Conexión con MongoDB desconectada');
});

module.exports = ConnectionsDB;
