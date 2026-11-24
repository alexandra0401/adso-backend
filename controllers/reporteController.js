const Producto = require('../models/Producto');
const Usuario = require('../models/Usuario');

// 10. GET /api/reportes/estadisticas
exports.obtenerEstadisticas = async (req, res) => {
  try {
    const [porCategoria, totalUsuarios] = await Promise.all([
      Producto.aggregate([
        {
          $group: {
            _id: '$categoria',
            totalProductos: { $sum: 1 },
            precioPromedio: { $avg: '$precio' },
            stockTotal: { $sum: '$stock' }
          }
        },
        { $sort: { totalProductos: -1 } }
      ]),
      Usuario.countDocuments()
    ]);

    const totalProductos = porCategoria.reduce((acc, c) => acc + c.totalProductos, 0);

    res.json({
      status: 'OK',
      resumen: { totalProductos, totalUsuarios, totalCategorias: porCategoria.length },
      agregaciones: porCategoria
    });
  } catch (error) {
    res.status(500).json({ status: 'Error', error: error.message });
  }
};
