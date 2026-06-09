# 📦 Backend I - Gestión de Productos y Carritos

## 📖 Descripción

Este proyecto consiste en una API REST desarrollada con Node.js y Express para la gestión de productos y carritos de compra.

La aplicación permite crear, consultar, actualizar y eliminar productos, además de crear carritos y agregar productos a los mismos.

Los datos se almacenan utilizando archivos JSON mediante el módulo FileSystem (`fs`), sin utilizar una base de datos.

---

## 🚀 Tecnologías Utilizadas

* Node.js
* Express.js
* FileSystem (`fs/promises`)
* UUID
* JavaScript

---

## 📁 Estructura del Proyecto

```text
src/
│
├── config/
├── managers/
│   ├── ProductManager.js
│   └── CartManager.js
│
├── middlewares/
│
├── routes/
│   ├── product.routes.js
│   └── cart.routes.js
│
├── data/
│   ├── products.json
│   └── carts.json
│
└── app.js

index.js
```

---

## ▶️ Instalación

1. Clonar el repositorio:

```bash
git clone <url-del-repositorio>
```

2. Instalar dependencias:

```bash
npm install
```

3. Ejecutar el proyecto:

```bash
npm start
```

o en desarrollo:

```bash
npm run dev
```

---

## 📦 Endpoints de Productos

### Obtener todos los productos

```http
GET /api/products
```

### Obtener un producto por ID

```http
GET /api/products/:id
```

### Crear un producto

```http
POST /api/products
```

### Actualizar un producto

```http
PUT /api/products/:id
```

### Eliminar un producto

```http
DELETE /api/products/:id
```

---

## 🛒 Endpoints de Carritos

### Crear un carrito

```http
POST /api/carts
```

### Obtener productos de un carrito

```http
GET /api/carts/:cid
```

### Agregar un producto al carrito

```http
POST /api/carts/:cid/product/:pid
```

Si el producto ya existe dentro del carrito, se incrementa automáticamente su cantidad.

---

## 💾 Persistencia

La información se almacena en archivos JSON:

* `products.json`
* `carts.json`

Los managers son responsables de leer y escribir la información utilizando FileSystem.

---

## ✅ Funcionalidades Implementadas

* Creación de productos.
* Consulta de productos.
* Actualización de productos.
* Eliminación de productos.
* Creación de carritos.
* Consulta de carritos.
* Agregado de productos al carrito.
* Validación de datos mediante middlewares.
* Generación automática de IDs mediante UUID.

---

## 👨‍💻 Autor

Proyecto desarrollado como parte del curso Backend I.
