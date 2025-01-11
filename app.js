const express = require('express');
const cors = require("cors");

const ConnectionsDB = require('./database/Conections/conectionsDB');
 require('dotenv').config();

const app = express();

// Middleware para procesar JSON y datos codificados en URL
app.use(express.json()); // Para analizar cuerpos JSON
app.use(express.urlencoded({ extended: true })); // Para analizar cuerpos con datos de formulario (x-www-form-urlencoded)

app.use(cors());

ConnectionsDB();


require('./routes')(app);
app.get('/', (req, res) => {
    res.send('hello word');
});

const port = process.env.port || 304;

app.listen(port, () => {
    console.log('Project execute in port:', port);
});
