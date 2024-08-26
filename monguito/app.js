const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./users'); // Importa las rutas desde 'users.js'
const config = require('./config'); // Importa la configuración desde 'config.js'

const app = express();
const port = config.port || 5000;




// Middleware
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB conectado'))
.catch(err => console.log('Error de conexión:', err));

// Usar rutas
app.use('/users', userRoutes);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
