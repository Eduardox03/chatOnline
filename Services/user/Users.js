const user = require('../../database/Models/users');

const createUsers = async (infoUsuario) => {
  // Verifica si los datos del usuario son válidos
  if (!infoUsuario) {
    throw new Error('User info invalid');
  }

  try {
    // Crea una nueva instancia del modelo de usuario
    const newUser = new user(infoUsuario);

    // Guarda el usuario en la base de datos
    await newUser.save();

    // Devuelve el usuario guardado
    return newUser;
  } catch (error) {
    throw new Error('Error saving user: ' + error.message);
  }
};

const listUsers = async () => user.find({});

const seachtUser = async (id) => user.findById(id);

const updateUsers = async (id, dataUpdate) => {
  try {
    const userUpdated = await user.findByIdAndUpdate(id, dataUpdate, { new: true });
    return userUpdated;
  } catch (error) {
    console.error('Error updating user:', error);
  }
};
module.exports = { createUsers, listUsers, seachtUser, updateUsers };
