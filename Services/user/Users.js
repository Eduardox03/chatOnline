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
    console.log(dataUpdate);
    const userUpdated = await user.findByIdAndUpdate(
      id,
      {
        name: dataUpdate.name,
        firName: dataUpdate.firName,
        document: dataUpdate.document,
        email: dataUpdate.email,
        birthdate: dataUpdate.birthdate,
        user: dataUpdate.user,
        status: dataUpdate.status,
        phoneNumber: dataUpdate.phoneNumber,
        typeOfDocument: dataUpdate.typeOfDocument,
        password: dataUpdate.password,
        roles: dataUpdate.roles,
      },
      { new: true }
    );
    if (!userUpdated) {
      throw new Error('Usuario no encontrado');
    }
    return userUpdated;
  } catch (error) {
    console.error('Error updating user:', error.message);
    throw error; // Re-throw the error or handle it accordingly
  }
};

module.exports = { createUsers, listUsers, seachtUser, updateUsers };
