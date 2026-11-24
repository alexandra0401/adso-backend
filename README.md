# Backend Express + MongoDB (Mongoose) — Guía 7 SENA ADSO 228118

API REST con Node.js, Express y MongoDB, con arquitectura en capas.
RAP 220501096-03 (593108-04) — Clase 9: Conexión a Base de Datos.

## Estructura

```
adso-backend/
├── config/db.js                 # Conexión asíncrona a MongoDB
├── models/                      # Esquemas Mongoose (Producto, Usuario)
├── controllers/                 # Lógica de cada endpoint
├── routes/                      # Mapeo de rutas REST
├── server.js                    # Punto de entrada
├── postman_collection.json      # Colección de pruebas (Postman / Thunder Client)
└── .env.example                 # Plantilla de variables de entorno
```

## Requisitos

- Node.js 18+ (recomendado 20+)
- MongoDB local en `mongodb://127.0.0.1:27017` o una cadena de MongoDB Atlas

## Instalación y ejecución

```bash
npm install
cp .env.example .env      # en Windows: copy .env.example .env
npm start                 # o: npm run dev
```

Si ves `✅ Conexión exitosa a la base de datos MongoDB`, todo está bien.

## Endpoints

| # | Método | Ruta | Descripción |
|---|--------|------|-------------|
| 1 | POST | /api/productos | Crear producto |
| 2 | GET | /api/productos | Listar productos |
| 3 | GET | /api/productos/:id | Producto por ID |
| 4 | PUT | /api/productos/:id | Actualizar producto |
| 5 | DELETE | /api/productos/:id | Eliminar producto |
| 6 | GET | /api/productos/categoria/:cat | Filtrar por categoría |
| 7 | POST | /api/usuarios/registro | Registrar usuario |
| 8 | POST | /api/usuarios/login | Login (devuelve JWT) |
| 9 | GET | /api/usuarios | Listar usuarios |
| 10 | GET | /api/reportes/estadisticas | Agregaciones por categoría |

## Pruebas

Importa `postman_collection.json` en Postman o Thunder Client. Orden sugerido: 1 → 2 → copiar el `_id`
en la variable `productoId` → 3, 4, 6 → 7 → 8 → 9 → 10 → 5.

## Notas de seguridad

- Las contraseñas se guardan con **bcrypt** (hash), nunca en texto plano.
- El campo `password` está oculto por defecto en las consultas (`select: false`).
- El archivo `.env` no se sube a GitHub (está en `.gitignore`); solo `.env.example`.
