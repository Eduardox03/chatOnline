const ConnectionsDB = require("../Conections/conectionsDB");
const user = require("../Models/users");

async function changeEventWath(io) {
    try {
        // Establish the database connection first
        await ConnectionsDB(); // Await the connection setup
        
        // Now that the database is connected, set up the change stream
        const userChangeStream = user.watch();

        userChangeStream.on('change', (data) => {
            console.log('Change in users collection', data);
            io.emit('userChange', data);
        });

        // Error handling for change stream
        userChangeStream.on('error', (error) => {
            console.error('Error with change stream for users:', error);
        });

        // Event listener for the change stream being closed
        userChangeStream.on('close', () => {
            console.log('Change stream closed');
        });

    } catch (error) {
        console.error('Error while setting up change stream for users:', error);
    }
}

module.exports = changeEventWath;
