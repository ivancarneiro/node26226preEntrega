# 📂 Pre-Entrega de Proyecto - Node.js

## 🎯 Objetivo del Proyecto
Construir una herramienta de consola (CLI) que permita interactuar y gestionar los productos de una tienda en línea consumiendo la API de [FakeStore](https://fakestoreapi.com/docs) de forma asíncrona mediante comandos ingresados en la terminal.

---

## ⚙️ Requerimientos Técnicos

### 1. Configuración Inicial
- **Punto de entrada:** Archivo `index.js`.
- **Inicialización:** Inicializar Node.js y npm mediante el comando:
  ```bash
  npm init -y
  ```
- **Soporte ESModules:** Habilitar módulos nativos agregando la propiedad `"type": "module"` en el archivo `package.json`.
- **Script de inicio:** Configurar en `package.json` el script `start`:
  ```json
  "scripts": {
    "start": "node index.js"
  }
  ```

---

### 2. Lógica de Gestión de Productos
El programa debe capturar argumentos de la línea de comandos e interpretar los siguientes métodos y recursos:

#### 1) Consultar todos los productos
* **Comando:**
  ```bash
  npm run start GET products
  ```
* **Acción:** Petición HTTP `GET` a `https://fakestoreapi.com/products`.
* **Resultado:** Muestra en la consola la lista completa de productos.

#### 2) Consultar un producto específico
* **Comando:**
  ```bash
  npm run start GET products/<productId>
  ```
* **Ejemplo:**
  ```bash
  npm run start GET products/15
  ```
* **Acción:** Petición HTTP `GET` a `https://fakestoreapi.com/products/<productId>`.
* **Resultado:** Obtiene y muestra en la consola la información del producto correspondiente.

#### 3) Crear un nuevo producto
* **Comando:**
  ```bash
  npm run start POST products <title> <price> <category>
  ```
* **Ejemplo:**
  ```bash
  npm run start POST products T-Shirt-Rex 300 remeras
  ```
* **Acción:** Petición HTTP `POST` a `https://fakestoreapi.com/products` enviando los datos provistos (`title`, `price`, `category`) en formato JSON en el cuerpo (`body`) de la petición.
* **Resultado:** Muestra en consola el objeto del producto creado retornado por la API.

#### 4) Eliminar un producto
* **Comando:**
  ```bash
  npm run start DELETE products/<productId>
  ```
* **Ejemplo:**
  ```bash
  npm run start DELETE products/7
  ```
* **Acción:** Petición HTTP `DELETE` a `https://fakestoreapi.com/products/<productId>`.
* **Resultado:** Muestra en consola la confirmación o el producto eliminado devuelto por la API.

---

## 💡 Tips de Desarrollo y Buenas Prácticas

- **Captura de argumentos:** Utiliza `process.argv` (usualmente `process.argv.slice(2)`) para capturar el método, recurso y datos adicionales pasados desde la terminal.
- **Peticiones HTTP con `fetch`:** Emplea la función nativa `fetch` de Node.js combinada con `async / await` para manejar la asincronía.
- **Manipulación de cadenas y rutas:** Emplea métodos como `.split('/')` para extraer el `productId` de rutas tipo `products/15`.
- **Desestructuración y Spread:** Aprovecha el uso de *destructuring* (`const [method, resource, ...args] = process.argv.slice(2)`) y *spread syntax* para manipular parámetros y objetos.
- **Manejo de errores:** Envuelve tus llamadas en bloques `try / catch` para controlar posibles fallos de red o parámetros inválidos.

---

## 📋 Resumen de Comandos

| Método | Sintaxis de Comando | Endpoint FakeStore | Descripción |
| :---: | :--- | :--- | :--- |
| **GET** | `npm run start GET products` | `GET /products` | Lista todos los productos |
| **GET** | `npm run start GET products/<id>` | `GET /products/:id` | Detalle de un producto por ID |
| **POST** | `npm run start POST products <title> <price> <category>` | `POST /products` | Crea un producto nuevo |
| **DELETE** | `npm run start DELETE products/<id>` | `DELETE /products/:id` | Elimina un producto por ID |
