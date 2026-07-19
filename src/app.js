
const express = require('express');
const http = require('http');
const dev = require('morgan')('dev');

// Rutas
const { router } = require('./routes/index.routes');
const { viewsRouter } = require('./routes/view.routes');

// Configuraciones Modularizadas
const { paths } = require('./config/config-app');
const setupHandlebars = require('./config/hbs.config');
const { corsMiddleware } = require('./config/cors.config');
const { init: initSocket } = require('./config/socket.io');
const setupProductSocket = require('./sockets/product.socket');
const cookieParser = require('cookie-parser');

const app = express();

// 1. Middlewares globales nativos y de terceros
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(dev);
app.use(corsMiddleware);
app.use(cookieParser());

// 2. Configuración del motor de vistas
setupHandlebars(app);
app.set('views', paths.pathViews);

// 3. Archivos estáticos
app.use('/uploads', express.static(paths.pathUpload));
app.use('/public', express.static(paths.pathPublic));

// 4. Enrutamiento
app.use('/api', router);
app.use('/', viewsRouter);

// 5. Servidor HTTP y Sockets
const server = http.createServer(app);
const io = initSocket(server);
setupProductSocket(io);

module.exports = { server };