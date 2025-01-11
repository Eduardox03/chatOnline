const user = require('../../database/Models/users')

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
        // Maneja cualquier error que ocurra durante la operación
        throw new Error('Error saving user: ' + error.message);
    }
}

module.exports = { createUsers }
