
# 🛒 E-commerce Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge)
![Handlebars](https://img.shields.io/badge/Handlebars-f0772b?style=for-the-badge&logo=handlebarsdotjs&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
![Multer](https://img.shields.io/badge/Multer-FF6F00?style=for-the-badge)
![Cookie Parser](https://img.shields.io/badge/Cookie--Parser-4CAF50?style=for-the-badge)
![dotenv](https://img.shields.io/badge/dotenv-ECD53F?style=for-the-badge)

## 📌 Descripción

Este proyecto corresponde a un **E-commerce Backend** desarrollado con **Node.js** y **Express.js**, como parte del curso de Backend.

La aplicación implementa una arquitectura modular siguiendo buenas prácticas de desarrollo, permitiendo administrar productos y carritos de compra mediante una API REST, además de incorporar vistas dinámicas con **Handlebars** para la interacción del usuario.

La persistencia de los datos se realiza mediante **MongoDB Atlas** utilizando **Mongoose**, reemplazando la persistencia inicial basada en archivos JSON para ofrecer una solución más escalable y cercana a un entorno de producción.

---

# 🚀 Características principales

* ✅ Arquitectura modular y escalable.
* ✅ API REST para Productos y Carritos.
* ✅ Persistencia con MongoDB Atlas y Mongoose.
* ✅ Paginación de productos.
* ✅ Filtros por categoría.
* ✅ Filtro por estado del producto.
* ✅ Ordenamiento por precio.
* ✅ Límite de productos por página.
* ✅ Vistas dinámicas con Handlebars.
* ✅ Vista de detalle de producto.
* ✅ Carrito persistente mediante Cookies.
* ✅ Agregar productos al carrito.
* ✅ Eliminar productos individuales del carrito.
* ✅ Vaciar completamente el carrito.
* ✅ Actualización en tiempo real mediante Socket.io.
* ✅ Carga de imágenes utilizando Multer.
* ✅ Variables de entorno con dotenv.

---

# 🛠 Tecnologías utilizadas

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* mongoose-paginate-v2

### Motor de vistas

* Express Handlebars

### Comunicación en tiempo real

* Socket.io

### Gestión de archivos

* Multer

### Middlewares

* Morgan
* CORS
* Cookie Parser
* Dotenv

---

# 📁 Arquitectura del proyecto

El proyecto está organizado siguiendo una estructura modular que separa responsabilidades para facilitar el mantenimiento y la escalabilidad.

```text
src
│
├── config/
│   ├── db.js
│   ├── multer.js
│   ├── socket.io.js
│   ├── hbs.config.js
│   ├── cors.config.js
│   └── config-app.js
│
├── controllers/
│   ├── product.controller.js
│   ├── cart.controller.js
│   └── view.controller.js
│
├── managers/
│   ├── ProductManager.js
│   └── CartManager.js
│
├── middlewares/
│
├── models/
│   ├── Product.model.js
│   └── Cart.model.js
│
├── routes/
│   ├── product.routes.js
│   ├── cart.routes.js
│   ├── view.routes.js
│   └── index.routes.js
│
├── scripts/
│   └── seedProducts.js
│
├── services/
│
├── sockets/
│   └── product.socket.js
│
├── utils/
│
├── views/
│   ├── layouts/
│   ├── pages/
│   └── partials/
│
├── public/
│
├── uploads/
│
└── app.js
```

---

# 🎯 Funcionalidades implementadas

## Gestión de Productos

* Obtener listado completo de productos.
* Obtener un producto por ID.
* Crear nuevos productos.
* Actualizar productos existentes.
* Eliminar productos.
* Subida de imágenes mediante Multer.

## Gestión de Carritos

* Crear un carrito automáticamente al agregar el primer producto.
* Agregar productos al carrito.
* Incrementar la cantidad cuando un producto ya existe.
* Visualizar el contenido del carrito.
* Eliminar productos individuales.
* Vaciar completamente el carrito.

## Catálogo de Productos

* Listado paginado.
* Búsqueda por categoría.
* Filtrado por estado.
* Ordenamiento ascendente y descendente por precio.
* Selección de cantidad de productos por página.
* Navegación entre páginas conservando los filtros seleccionados.

## Vistas

* Home.
* RealTimeProducts.
* Catálogo de Productos.
* Detalle de Producto.
* Carrito de Compras.

---

# 💡 Principales decisiones de diseño

Durante el desarrollo se priorizó una arquitectura desacoplada separando la lógica de negocio, el acceso a datos, las rutas y las vistas.

Además, se implementó una capa de servicios para encapsular procesos específicos y facilitar futuras ampliaciones del sistema.

La persistencia fue migrada desde archivos JSON hacia MongoDB Atlas utilizando Mongoose, permitiendo incorporar paginación, consultas avanzadas y una estructura de datos mucho más escalable.

# ⚙️ Instalación y Configuración

## 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
```

Ingresar al directorio del proyecto:

```bash
cd <NOMBRE_DEL_PROYECTO>
```

---

## 2. Instalar dependencias

```bash
npm install
```

---

## 3. Configurar las variables de entorno

El proyecto utiliza variables de entorno para proteger información sensible.

Crear un archivo **.env** en la raíz del proyecto tomando como referencia el archivo **.env.example**.

Ejemplo:

```env
PORT=3030
MONGO_URI=TU_MONGO_URI
```

> **Importante:** Por motivos de seguridad, la URI real de MongoDB Atlas no se encuentra incluida en este repositorio.

---

## 4. Ejecutar el proyecto

Modo desarrollo:

```bash
npm run dev
```

Modo producción:

```bash
npm start
```

El servidor estará disponible en:

```text
http://localhost:3030
```

---

# 🌱 Poblar la Base de Datos

Para facilitar las pruebas del sistema se incluye un script que genera automáticamente productos de ejemplo.

Ejecutar:

```bash
node src/scripts/seedProducts.js
```

El script:

* Elimina los productos existentes.
* Genera automáticamente productos de prueba.
* Inserta los nuevos registros en MongoDB.
* Asigna categorías, precios, stock e imágenes de ejemplo.

---

# 📄 Vistas Implementadas

## 🏠 Home

Ruta:

```text
/
```

Permite administrar los productos mediante formularios.

Funciones disponibles:

* Crear productos.
* Editar productos.
* Eliminar productos.

---

## ⚡ RealTimeProducts

Ruta:

```text
/realtimeproducts
```

Permite visualizar los productos con actualización en tiempo real utilizando Socket.io.

---

## 🛍️ Catálogo de Productos

Ruta:

```text
/products
```

Características:

* Listado paginado.
* Navegación entre páginas.
* Filtro por categoría.
* Filtro por estado.
* Ordenamiento por precio.
* Selección del límite de productos por página.
* Acceso al detalle de cada producto.

---

## 📦 Detalle del Producto

Ruta:

```text
/products/:pid
```

Permite visualizar toda la información de un producto específico y agregarlo al carrito de compras.

---

## 🛒 Carrito de Compras

Ruta:

```text
/cart
```

Funciones disponibles:

* Visualizar productos agregados.
* Calcular automáticamente el total de la compra.
* Eliminar productos individuales.
* Vaciar completamente el carrito.

El carrito permanece asociado al usuario mediante una Cookie, evitando que sea necesario indicar el ID manualmente.

---

# 🔌 API REST

## Productos

| Método | Endpoint            | Descripción                 |
| ------ | ------------------- | --------------------------- |
| GET    | `/api/products`     | Obtener todos los productos |
| GET    | `/api/products/:id` | Obtener un producto por ID  |
| POST   | `/api/products`     | Crear un producto           |
| PUT    | `/api/products/:id` | Actualizar un producto      |
| DELETE | `/api/products/:id` | Eliminar un producto        |

---

## Carritos

| Método | Endpoint                                 | Descripción                    |
| ------ | ---------------------------------------- | ------------------------------ |
| POST   | `/api/carts`                             | Crear un carrito               |
| GET    | `/api/carts/:id`                         | Obtener un carrito             |
| POST   | `/api/carts/:cartId/products/:productId` | Agregar un producto al carrito |

---

# 📊 Funcionalidades del Catálogo

El catálogo de productos permite combinar múltiples parámetros de búsqueda mediante Query Params.

Ejemplos:

Filtrar por categoría:

```text
/products?category=Ropa
```

Filtrar por estado:

```text
/products?status=true
```

Ordenar por precio:

```text
/products?sort=asc
```

Limitar cantidad de productos:

```text
/products?limit=5
```

Ir a una página específica:

```text
/products?page=2
```

Los filtros pueden combinarse entre sí, permitiendo realizar consultas más específicas.

Ejemplo:

```text
/products?category=Ropa&status=true&sort=asc&limit=5&page=2
```

---

# 🧪 Validaciones Implementadas

El proyecto incorpora diferentes validaciones para garantizar la integridad de los datos.

Entre ellas:

* Validación de IDs de MongoDB.
* Validación de productos antes de su creación.
* Validación de actualización parcial de productos.
* Manejo centralizado de errores.
* Verificación de existencia de productos y carritos antes de realizar operaciones.
* Respuestas HTTP adecuadas según cada caso de error.

# 🧠 Decisiones de Diseño

Durante el desarrollo del proyecto se tomaron diversas decisiones con el objetivo de construir una aplicación escalable, mantenible y fácil de extender.

### Arquitectura Modular

El proyecto fue organizado separando responsabilidades en distintas capas:

* **Routes:** Definición de endpoints.
* **Controllers:** Recepción de las peticiones HTTP y envío de respuestas.
* **Managers:** Implementación de la lógica de negocio y acceso a la base de datos.
* **Models:** Definición de los esquemas mediante Mongoose.
* **Services:** Encapsulación de procesos reutilizables.
* **Middlewares:** Validaciones y procesamiento previo de las solicitudes.
* **Config:** Configuración centralizada del proyecto.

Esta estructura facilita el mantenimiento del código y permite incorporar nuevas funcionalidades sin afectar el resto de la aplicación.

---

# 🔒 Seguridad

Para proteger información sensible se implementaron buenas prácticas como:

* Uso de variables de entorno mediante **dotenv**.
* Exclusión del archivo `.env` del repositorio mediante `.gitignore`.
* Archivo `.env.example` para facilitar la configuración del proyecto.
* Validación de datos recibidos antes de realizar operaciones sobre la base de datos.
* Manejo controlado de errores mediante bloques `try/catch`.

---

# 🚀 Funcionalidades Implementadas

## Gestión de Productos

* Crear productos.
* Obtener todos los productos.
* Obtener un producto por ID.
* Actualizar productos.
* Eliminar productos.
* Subida de imágenes mediante Multer.

## Gestión de Carritos

* Creación automática del carrito al agregar el primer producto.
* Asociación del carrito al usuario mediante Cookies.
* Agregar productos.
* Incrementar automáticamente la cantidad de un producto existente.
* Eliminar productos individuales.
* Vaciar completamente el carrito.
* Cálculo automático del total de la compra.

## Catálogo

* Paginación.
* Filtros por categoría.
* Filtros por estado.
* Ordenamiento por precio.
* Límite de productos por página.
* Conservación de filtros al navegar entre páginas.

## Vistas

* Home.
* RealTimeProducts.
* Catálogo de Productos.
* Detalle de Producto.
* Carrito de Compras.

---

# 📈 Mejoras Futuras

Algunas funcionalidades que podrían incorporarse en futuras versiones son:

* Implementación de autenticación con JWT.
* Registro e inicio de sesión de usuarios.
* Asociación de un carrito por usuario autenticado.
* Roles de usuario (Administrador y Cliente).
* Panel de administración para gestión completa del catálogo.
* Búsqueda por nombre del producto.
* Recuperación de contraseña.
* Integración con pasarelas de pago (Stripe, Mercado Pago, etc.).
* Historial de compras.
* Sistema de favoritos.
* Validación de stock en tiempo real.
* Tests automatizados.
* Documentación de la API mediante Swagger.

---

# 👨‍💻 Autor

**Emiliano Fioquetti**

Proyecto desarrollado como entrega del curso de **Backend** utilizando Node.js, Express.js, MongoDB Atlas y Handlebars.

---

# 🙏 Agradecimientos

Quiero agradecer al profesor y a los tutores por el acompañamiento brindado durante el desarrollo del curso.

Sus explicaciones, correcciones y sugerencias fueron fundamentales para comprender conceptos clave del desarrollo Backend y mejorar continuamente este proyecto.

Asimismo, agradezco a todos mis compañeros por compartir experiencias, resolver dudas y contribuir a generar un excelente ambiente de aprendizaje.

---

# ⭐ Estado del Proyecto

✅ Proyecto Finalizado

La aplicación cumple con los requisitos solicitados para la entrega e incorpora funcionalidades adicionales que mejoran la experiencia del usuario y la organización del código, aplicando una arquitectura modular y buenas prácticas de desarrollo.

---

## 📬 Contacto

En caso de consultas o sugerencias sobre el proyecto, no dudes en comunicarte a través de GitHub.

Si este proyecto te resultó útil o interesante, ¡no olvides dejar una ⭐ en el repositorio!
