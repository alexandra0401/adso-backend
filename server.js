require('dotenv').config();
const express = require('express');
const cors = require('cors');
const conectarBD = require('./config/db');

const app = express();

// 1. Conectar a la base de datos
conectarBD();

// 2. Middlewares globales
app.use(cors());
app.use(express.json()); // Parsea cuerpos JSON en req.body

// 3. Ruta raíz de verificación
app.get('/', (req, res) => {
  res.json({ status: 'OK', message: 'API ADSO - Express + MongoDB funcionando' });
});

// 4. Rutas de la API
app.use('/api/productos', require('./routes/productoRoutes'));
app.use('/api/usuarios', require('./routes/usuarioRoutes'));
app.use('/api/reportes', require('./routes/reporteRoutes'));

// 5. Manejo de rutas inexistentes
app.use((req, res) => {
  res.status(404).json({ status: 'Error', error: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});
