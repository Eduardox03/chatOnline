const ConnectionsDB = require('../Conections/conectionsDB');
const user = require('../Models/users');
const chat= require('../Models/chat')
// funcion asincrona qquie permite conectarce a la base de datos
//y al mismo tiempo escuchando los cambios y emitiendolos al fron-end
async function changeEventWath(io) {
  try {
    // llama a  la funcion   para ejecutar la coneccions
    await ConnectionsDB(); //Esperar la  conecion

    // Now that the database is connected, set up the change stream
    const userChangeStream = user.watch();

    const chatChangeStream=chat.watch();

    userChangeStream.on('change', (data) => {
      console.log('Change in users collection', data);
      io.emit('userChange', data);
    });

    chatChangeStream.on('change',(data)=>{
      console.log('change in chat collections',data)
      io.emit('chatChage',data)
    })


    // Error handling for change stream
    userChangeStream.on('error', (error) => {
      console.error('Error with change stream for users:', error);
    });

    // Cerrando evento que eschucha los cambios de la  db
    userChangeStream.on('close', () => {
      console.log('Change stream closed');
    });
  } catch (error) {
    console.error('Error while setting up change stream for users:', error);
  }
}

module.exports = changeEventWath;
