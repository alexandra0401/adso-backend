const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

// 7. POST /api/usuarios/registro
exports.registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({
        status: 'Error',
        error: 'La contraseña debe tener al menos 6 caracteres'
      });
    }

    const existe = await Usuario.findOne({ email });
    if (existe) {
      return res.status(409).json({ status: 'Error', error: 'El email ya está registrado' });
    }

    // La contraseña se guarda siempre encriptada (hash), nunca en texto plano
    const hash = await bcrypt.hash(password, 10);
    const usuario = await Usuario.create({ nombre, email, password: hash });

    res.status(201).json({
      status: 'OK',
      message: 'Usuario registrado exitosamente',
      data: { _id: usuario._id, nombre: usuario.nombre, email: usuario.email }
    });
  } catch (error) {
    res.status(400).json({ status: 'Error', error: error.message });
  }
};

// 8. POST /api/usuarios/login
exports.loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ status: 'Error', error: 'Email y contraseña son obligatorios' });
    }

    // select('+password') porque en el modelo el campo está oculto por defecto
    const usuario = await Usuario.findOne({ email: email.toLowerCase() }).select('+password');
    const coincide = usuario ? await bcrypt.compare(password, usuario.password) : false;

    if (!usuario || !coincide) {
      return res.status(401).json({ status: 'Error', error: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: usuario._id, email: usuario.email },
      process.env.JWT_SECRET || 'secreto_de_desarrollo',
      { expiresIn: process.env.JWT_EXPIRES_IN || '2h' }
    );

    res.json({
      status: 'OK',
      token,
      usuario: { _id: usuario._id, nombre: usuario.nombre, email: usuario.email }
    });
  } catch (error) {
    res.status(500).json({ status: 'Error', error: error.message });
  }
};

// 9. GET /api/usuarios
exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find(); // password excluido por select:false
    res.json({ status: 'OK', total: usuarios.length, data: usuarios });
  } catch (error) {
    res.status(500).json({ status: 'Error', error: error.message });
  }
};
