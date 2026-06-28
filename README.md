# 🏋️ E-commerce Lab

![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?logo=socketdotio)
![Handlebars](https://img.shields.io/badge/Handlebars-f0772b?logo=handlebarsdotjs)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Multer](https://img.shields.io/badge/Multer-4CAF50)
![Morgan](https://img.shields.io/badge/Morgan-795548)
![UUID](https://img.shields.io/badge/UUID-1565C0)
![MVC](https://img.shields.io/badge/Architecture-MVC-blue)


<p align="center">

Aplicación web desarrollada con **Node.js**, **Express** y **Socket.IO** para la gestión de productos y carritos de un E-commerce.

El proyecto combina una **API REST**, una **interfaz web tradicional renderizada con Handlebars** y una **versión en tiempo real mediante WebSockets**, aplicando una arquitectura modular basada en el patrón **MVC** y buenas prácticas de desarrollo Backend.

</p>

---

# 📚 Índice

- [📖 Descripción](#-descripción)
- [✨ Características principales](#-características-principales)
- [🛠️ Tecnologías utilizadas](#️-tecnologías-utilizadas)
- [🏛️ Arquitectura del proyecto](#️-arquitectura-del-proyecto)
- [📂 Estructura del proyecto](#-estructura-del-proyecto)

---

# 📖 Descripción

**E-commerce Lab** es un proyecto desarrollado durante la cursada de **Backend I**, cuya finalidad es implementar una plataforma para la administración de productos y carritos de compra pertenecientes a un E-commerce.

Durante su evolución, el proyecto pasó de ser una API REST sencilla con persistencia mediante archivos JSON a una aplicación mucho más completa, incorporando renderizado del lado del servidor, comunicación en tiempo real y una arquitectura desacoplada.

Actualmente el sistema integra dos formas distintas de interactuar con la aplicación:

## 🖥️ Versión HTTP Tradicional

Implementada mediante **Express + Handlebars**, permite administrar los productos utilizando formularios tradicionales renderizados desde el servidor.

Incluye:

- Alta de productos
- Edición de productos
- Eliminación de productos
- Carga de imágenes mediante Multer
- Validaciones mediante Middlewares
- Alertas visuales con SweetAlert2

---

## ⚡ Versión Live (WebSockets)

Implementada mediante **Socket.IO**, permite administrar exactamente los mismos productos pero con actualización automática en tiempo real.

Las modificaciones realizadas por cualquier usuario conectado se reflejan instantáneamente en todos los clientes sin necesidad de recargar la página.

Incluye:

- Alta de productos en tiempo real
- Actualización instantánea
- Eliminación instantánea
- Sincronización automática entre clientes
- Comunicación bidireccional Cliente ↔ Servidor

---

# ✨ Características principales

## 🚀 Backend

- Arquitectura MVC
- API REST completamente funcional
- Organización modular del proyecto
- Separación de responsabilidades
- Persistencia mediante archivos JSON
- Identificadores únicos mediante UUID
- Middlewares personalizados
- Servicios desacoplados mediante capa Service

---

## 🌐 Frontend

- Renderizado del lado del servidor (SSR)
- Plantillas dinámicas con Handlebars
- CSS personalizado con estética Cyber Fitness
- Navegación entre vistas
- Interfaz responsive
- Delegación de eventos mediante JavaScript

---

## ⚡ Tiempo Real

- Socket.IO
- Actualización automática
- Sin recargar la página
- Comunicación Cliente ↔ Servidor
- Sincronización inmediata de productos

---

## 🛡️ Validaciones

El proyecto implementa distintas capas de validación para garantizar la integridad de los datos.

Entre ellas:

- Validación de UUID
- Validación de precio
- Validación de stock
- Validación de datos requeridos
- Manejo de errores mediante Middlewares
- Redirección controlada hacia la vista principal
- Mensajes de error amigables para el usuario

---

## 🎨 Interfaz

La aplicación utiliza una identidad visual inspirada en una estética **Cyber Fitness / Neon**, utilizando una combinación de colores violetas, fucsias y cyan para ofrecer una experiencia visual moderna.

La interfaz incorpora:

- SweetAlert2
- Formularios estilizados
- Navbar compartido
- Tarjetas de productos
- Formularios de edición
- Confirmaciones visuales
- Alertas personalizadas

---

# 🛠️ Tecnologías utilizadas

| Categoría | Tecnologías |
|-----------|-------------|
| **Lenguaje** | JavaScript (ES6+) |
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Motor de plantillas** | Express Handlebars |
| **Tiempo real** | Socket.IO |
| **Carga de archivos** | Multer |
| **Persistencia** | FileSystem (`fs/promises`) |
| **Identificadores** | UUID |
| **Logs** | Morgan |
| **Frontend** | HTML5 · CSS3 · JavaScript |
| **Alertas** | SweetAlert2 |

---

# 🏛️ Arquitectura del proyecto

El proyecto sigue una arquitectura basada en el patrón **MVC (Model - View - Controller)**, permitiendo separar correctamente cada responsabilidad dentro de la aplicación.

```text
                  Cliente
                     │
                     ▼
                Express Router
                     │
                     ▼
               Middlewares
                     │
                     ▼
               Controllers
                     │
          ┌──────────┴──────────┐
          ▼                     ▼
      Services              Views (.hbs)
          │
          ▼
      Managers
          │
          ▼
 Persistencia (JSON)
```

Esta organización facilita:

- Escalabilidad
- Reutilización del código
- Mantenimiento
- Separación de responsabilidades
- Fácil incorporación de nuevas funcionalidades

---

# 📂 Estructura del proyecto

```text
📦 E-commerce Lab
│
├── 📂 public
│   ├── css/
│   ├── img/
│   └── script/
│
├── 📂 src
│   ├── 📂 config
│   ├── 📂 controllers
│   ├── 📂 data
│   ├── 📂 managers
│   ├── 📂 middlewares
│   ├── 📂 routes
│   ├── 📂 services
│   ├── 📂 sockets
│   ├── 📂 utils
│   ├── 📂 views
│   └── 📄 app.js
│
├── 📂 uploads
│
├── 📄 package.json
├── 📄 package-lock.json
├── 📄 .gitignore
└── 📄 README.md
```

## Descripción de cada carpeta

| Carpeta | Función |
|----------|---------|
| **config/** | Configuración general de la aplicación (Handlebars, Socket.IO, Multer, etc.) |
| **controllers/** | Reciben las peticiones HTTP y coordinan la lógica de negocio. |
| **data/** | Archivos JSON utilizados como persistencia local. |
| **managers/** | Encargados de interactuar directamente con los archivos JSON. |
| **middlewares/** | Validaciones y control de errores antes de llegar al controlador. |
| **routes/** | Definición de todos los endpoints de la aplicación. |
| **services/** | Capa intermedia encargada de desacoplar la lógica entre controladores y managers. |
| **sockets/** | Eventos y comunicación mediante Socket.IO. |
| **utils/** | Funciones auxiliares reutilizables. |
| **views/** | Plantillas Handlebars y componentes reutilizables. |
| **public/** | Recursos públicos (CSS, imágenes y JavaScript del cliente). |
| **uploads/** | Almacenamiento físico de las imágenes subidas por el usuario. |

---

> 📌 **Continúa con la Parte 2**, donde se documentarán la instalación del proyecto, scripts disponibles, API REST, vistas HTTP, comunicación mediante Socket.IO y el funcionamiento interno de la aplicación.


# 🚀 Instalación y ejecución

## Requisitos previos

Antes de ejecutar el proyecto es necesario tener instalado:

- Node.js
- npm (incluido con Node.js)
- Git

---

## Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
```

Ingresar al proyecto:

```bash
cd E-commerce-Lab
```

---

## Instalar dependencias

```bash
npm install
```

---

## Ejecutar el proyecto

Modo desarrollo

```bash
npm run dev
```

Modo producción

```bash
npm start
```

Una vez iniciado el servidor podrás acceder desde el navegador a:

```text
http://localhost:8080
```

> *(Reemplazar el puerto si utilizás otro diferente.)*

---

# 📦 Dependencias principales

| Dependencia | Función |
|-------------|----------|
| Express | Framework principal del servidor |
| Express Handlebars | Renderizado de vistas |
| Socket.IO | Comunicación en tiempo real |
| Multer | Subida de imágenes |
| Morgan | Registro de peticiones HTTP |
| UUID | Generación de identificadores únicos |

---

# 📜 Scripts disponibles

| Script | Descripción |
|----------|-------------|
| `npm run dev` | Ejecuta la aplicación en modo desarrollo utilizando el watcher de Node.js. |
| `npm start` | Ejecuta la aplicación en modo producción. |

---

# 🌐 Interfaces de la aplicación

La aplicación posee dos formas distintas de interactuar con el sistema.

Ambas trabajan sobre la misma información, pero utilizando tecnologías diferentes.

---

# 🖥️ Versión HTTP

Ruta:

```text
/
```

Esta vista representa el funcionamiento tradicional de una aplicación web utilizando renderizado del lado del servidor.

Desde esta pantalla el usuario puede:

- Crear productos
- Editar productos
- Eliminar productos
- Visualizar todos los productos
- Subir imágenes
- Recibir mensajes de validación
- Navegar hacia la versión Live

---

### Funcionalidades implementadas

✔ Alta de productos

✔ Edición mediante formularios

✔ Eliminación con confirmación mediante SweetAlert2

✔ Renderizado dinámico con Handlebars

✔ Carga física de imágenes mediante Multer

✔ Validaciones mediante Middlewares

✔ Manejo de errores con redirecciones controladas

---

# ⚡ Versión Live

Ruta:

```text
/live
```

Esta vista utiliza Socket.IO para mantener sincronizados todos los clientes conectados.

Cada modificación realizada por un usuario se replica automáticamente en el resto de los clientes.

No es necesario actualizar la página para visualizar los cambios.

---

### Funcionalidades implementadas

✔ Alta en tiempo real

✔ Actualización en tiempo real

✔ Eliminación en tiempo real

✔ Sincronización automática

✔ Comunicación Cliente ↔ Servidor

✔ Confirmaciones mediante SweetAlert2

✔ Validaciones antes de emitir eventos al servidor

---

# 🔄 Flujo de funcionamiento

```text
Cliente

      │

      ▼

Formulario

      │

      ▼

Validación Frontend

      │

      ▼

Express / Socket.IO

      │

      ▼

Middlewares

      │

      ▼

Controllers

      │

      ▼

Services

      │

      ▼

Managers

      │

      ▼

JSON
```

Cada capa tiene una responsabilidad específica, permitiendo mantener el proyecto organizado y desacoplado.

---

# 📡 API REST

## Productos

| Método | Endpoint | Descripción |
|---------|----------|-------------|
| GET | `/api/products` | Obtiene todos los productos. |
| GET | `/api/products/:pid` | Obtiene un producto mediante su identificador. |
| POST | `/api/products` | Crea un nuevo producto. |
| PUT | `/api/products/:pid` | Actualiza un producto existente. |
| DELETE | `/api/products/:pid` | Elimina un producto. |

---

## Carritos

| Método | Endpoint | Descripción |
|---------|----------|-------------|
| POST | `/api/carts` | Crea un carrito vacío. |
| GET | `/api/carts/:cid` | Obtiene todos los productos del carrito. |
| POST | `/api/carts/:cid/product/:pid` | Agrega un producto al carrito. Si el producto ya existe, incrementa automáticamente su cantidad. |

---

# 🛡️ Sistema de validaciones

La aplicación implementa múltiples validaciones para garantizar la consistencia de la información antes de modificar los datos almacenados.

Entre ellas se encuentran:

- Validación de UUID.
- Validación de campos obligatorios.
- Validación de precio.
- Validación de stock.
- Validación de existencia del producto.
- Validación de existencia del carrito.

Cuando una validación falla en la versión HTTP:

1. El middleware detecta el error.
2. Redirecciona nuevamente hacia la vista principal.
3. El controlador recupera el mensaje enviado mediante Query Params.
4. Handlebars renderiza nuevamente la vista mostrando el mensaje de error.
5. La lista de productos permanece visible evitando perder el contexto de trabajo.

Este mecanismo evita responder con JSON cuando el usuario está interactuando desde una interfaz HTML, mejorando significativamente la experiencia de uso.

---

# 📂 Persistencia de datos

Actualmente el proyecto utiliza persistencia local mediante archivos JSON.

Los datos son administrados por los Managers de la aplicación utilizando operaciones asincrónicas mediante:

```javascript
fs/promises
```

Archivos utilizados:

```text
src/data/

├── products.json
└── carts.json
```

Cada operación de lectura y escritura es centralizada dentro de los Managers, evitando que otras capas accedan directamente a los archivos.

---

# 🖼️ Gestión de imágenes

La carga de imágenes se realiza mediante **Multer**.

Las imágenes son almacenadas físicamente dentro del directorio:

```text
uploads/
```

Posteriormente la información del archivo queda asociada al producto correspondiente para poder visualizarla desde ambas interfaces de la aplicación.

---

> 📌 **Continúa con la Parte 3**, donde se documentarán las decisiones de arquitectura, las funcionalidades implementadas, las mejoras realizadas durante el desarrollo, las futuras ampliaciones del proyecto y la información del autor.



# 🏗️ Decisiones de arquitectura

Durante el desarrollo del proyecto se buscó aplicar buenas prácticas de organización y separación de responsabilidades para facilitar el mantenimiento y la escalabilidad del sistema.

## Patrón MVC

La aplicación está organizada siguiendo el patrón **Model - View - Controller**, permitiendo desacoplar la lógica de negocio de la interfaz y de las rutas.

Cada capa posee una responsabilidad específica:

| Capa | Responsabilidad |
|-------|-----------------|
| **Routes** | Define los endpoints y deriva las peticiones al controlador correspondiente. |
| **Middlewares** | Realiza validaciones y verificaciones previas antes de ejecutar la lógica de negocio. |
| **Controllers** | Recibe la petición, coordina la operación y genera la respuesta. |
| **Services** | Contiene la lógica de negocio y actúa como intermediario entre Controllers y Managers. |
| **Managers** | Se encargan exclusivamente del acceso y manipulación de los archivos JSON. |
| **Views** | Renderizan la interfaz utilizando Express Handlebars. |
| **Sockets** | Gestionan todos los eventos en tiempo real mediante Socket.IO. |

---

# ⚙️ Flujo de una petición HTTP

```text
Cliente

   │

   ▼

Routes

   │

   ▼

Middlewares

   │

   ▼

Controllers

   │

   ▼

Services

   │

   ▼

Managers

   │

   ▼

JSON
```

Este flujo permite mantener una correcta separación de responsabilidades y evita concentrar toda la lógica dentro de los controladores.

---

# ⚡ Flujo de un evento Socket.IO

```text
Cliente

   │

   ▼

Socket Event

   │

   ▼

Socket Controller

   │

   ▼

Services

   │

   ▼

Managers

   │

   ▼

Persistencia

   │

   ▼

Broadcast

   │

   ▼

Clientes conectados
```

Gracias a este mecanismo todos los usuarios visualizan las modificaciones en tiempo real sin necesidad de actualizar el navegador.

---

# 🎯 Funcionalidades implementadas

## Gestión de productos

- Crear productos.
- Consultar productos.
- Actualizar productos.
- Eliminar productos.
- Subir imágenes mediante Multer.
- Validación completa de los datos recibidos.

---

## Gestión de carritos

- Crear carritos.
- Obtener un carrito.
- Agregar productos.
- Incrementar automáticamente la cantidad cuando un producto ya existe dentro del carrito.

---

## Comunicación en tiempo real

- Alta de productos.
- Eliminación de productos.
- Actualización de productos.
- Sincronización automática de clientes.
- Eventos emitidos mediante Socket.IO.

---

## Interfaz Web

- Navegación entre versión HTTP y versión Live.
- Formularios dinámicos.
- Edición desde la misma tarjeta del producto.
- Confirmaciones mediante SweetAlert2.
- Mensajes de error amigables.
- Diseño visual unificado.

---

# 🛡️ Manejo de errores

El proyecto implementa un sistema de validaciones distribuido entre el cliente y el servidor.

### Validaciones del lado del cliente

- Verificación de precio.
- Verificación de stock.
- Confirmaciones de eliminación.
- Alertas mediante SweetAlert2.

---

### Validaciones del lado del servidor

- Validación de UUID.
- Validación de datos obligatorios.
- Validación de existencia del producto.
- Validación de existencia del carrito.
- Validación de tipos de datos.

---

### Manejo de errores HTTP

Cuando una validación falla durante una petición tradicional:

- El middleware intercepta el error.
- Se realiza una redirección hacia la vista principal.
- El mensaje viaja mediante Query Params.
- El controlador renderiza nuevamente la página.
- La vista muestra el mensaje correspondiente sin perder la información previamente cargada.

Este mecanismo mejora la experiencia del usuario evitando respuestas JSON cuando se trabaja desde una interfaz HTML.

---

# 💡 Principios aplicados durante el desarrollo

Durante la construcción del proyecto se aplicaron distintos principios para mantener un código limpio y fácil de mantener.

- Separación de responsabilidades.
- Modularización.
- Reutilización de código.
- Organización por capas.
- Validaciones centralizadas.
- Comunicación desacoplada.
- Código reutilizable.
- Escalabilidad.

---

# 🚀 Posibles mejoras futuras

El proyecto fue diseñado de manera modular para facilitar la incorporación de nuevas funcionalidades.

Algunas mejoras posibles son:

- Implementar una base de datos MongoDB.
- Incorporar Mongoose como ODM.
- Agregar autenticación mediante JWT.
- Sistema de usuarios y roles.
- Panel de administración.
- Paginación de productos.
- Búsqueda avanzada y filtros.
- Variables de entorno mediante dotenv.
- Dockerización de la aplicación.
- Testing automatizado.
- Despliegue en la nube.

---

# 📸 Capturas de la aplicación

Se recomienda agregar imágenes de ambas interfaces para mostrar el funcionamiento del proyecto.

Ejemplo de estructura:

```text
README/

├── home.png
├── live.png
└── architecture.png
```

Luego pueden mostrarse utilizando Markdown:

```md
## Vista HTTP

![Home](./README/home.png)

---

## Vista Live

![Live](./README/live.png)
```

---

# 📄 Licencia

Este proyecto fue desarrollado con fines educativos como parte de la Diplomatura en Desarrollo Backend.

Su código puede utilizarse como referencia para fines de aprendizaje.

---

# 👨‍💻 Autor

**Emiliano Fioquetti**

Proyecto desarrollado para la **Diplomatura en Desarrollo Backend** utilizando Node.js, Express y Socket.IO.

---

# 🙌 Agradecimientos

A los docentes y tutores de la diplomatura por el acompañamiento durante el desarrollo del proyecto y a la comunidad de Node.js por la documentación y herramientas que hicieron posible su implementación.

---

<div align="center">

### ⭐ Gracias por visitar este proyecto.

Si este repositorio te resultó útil o interesante, no olvides dejar una ⭐.

</div>