const express = require('express');
const router = express.Router();
const c = require('../controllers/productoController');

// IMPORTANTE: la ruta /categoria/:cat va ANTES de /:id para que Express no la confunda con un id
router.get('/categoria/:cat', c.filtrarPorCategoria); // 6
router.post('/', c.crearProducto);                    // 1
router.get('/', c.obtenerProductos);                  // 2
router.get('/:id', c.obtenerProductoPorId);           // 3
router.put('/:id', c.actualizarProducto);             // 4
router.delete('/:id', c.eliminarProducto);            // 5

module.exports = router;
