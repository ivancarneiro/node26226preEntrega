# 📂 Pre-Entrega de Proyecto - Node.js

## 🎯 Objetivo del Proyecto
Construir una herramienta de consola (CLI) que permita interactuar y gestionar los productos de una tienda en línea consumiendo una API REST de forma asíncrona mediante comandos ingresados en la terminal.

> [!NOTE]
> **Nota sobre el servicio de API:**  
> Debido a intermitencias y caídas en el servicio original de **FakeStoreAPI** (`fakestoreapi.com`), el proyecto fue adaptado para consumir la API pública de **[DummyJSON Products](https://dummyjson.com/docs/products)** (`https://dummyjson.com/products`). Se mantuvieron intactas todas las operaciones, métodos y sintaxis de comandos requeridos en la consigna.

---

## ⚙️ Configuración del Entorno y Scripts

- **Punto de entrada:** [`index.js`](./index.js).
- **Módulo de gestión de productos:** [`productManager.js`](./productManager.js).
- **Soporte ESModules:** Habilitado mediante `"type": "module"` en [`package.json`](./package.json).
- **Scripts configurados:**
  ```json
  "scripts": {
    "start": "node index.js",
    "test": "mocha"
  }
  ```

---

## 🚀 Uso de Comandos (CLI)

El programa interpreta los argumentos ingresados por terminal y normaliza las salidas para presentar únicamente las propiedades esenciales solicitadas en los requerimientos: `id`, `title`, `price` y `category`.

### 1) Consultar todos los productos
* **Comando:**
  ```bash
  npm run start GET products
  ```
* **Acción:** Petición HTTP `GET` a `https://dummyjson.com/products`.
* **Salida esperada:** Lista de objetos con los productos disponibles:
  ```javascript
  [
    { id: 1, title: 'Essence Mascara Lash Princess', price: 9.99, category: 'beauty' },
    { id: 2, title: 'Eyeshadow Palette with Mirror', price: 19.99, category: 'beauty' },
    ...
  ]
  ```

### 2) Consultar un producto específico
* **Comando:**
  ```bash
  npm run start GET products/<productId>
  ```
* **Ejemplo:**
  ```bash
  npm run start GET products/7
  ```
* **Acción:** Petición HTTP `GET` a `https://dummyjson.com/products/7`.
* **Salida esperada:**
  ```javascript
  { id: 7, title: 'Chanel Coco Noir Eau De', price: 129.99, category: 'fragrances' }
  ```

### 3) Crear un nuevo producto
* **Comando:**
  ```bash
  npm run start POST products <title> <price> <category>
  ```
* **Ejemplo:**
  ```bash
  npm run start POST products "Remera negra" 29.99 "men's clothing"
  ```
* **Acción:** Petición HTTP `POST` a `https://dummyjson.com/products/add` enviando el cuerpo en formato JSON.
* **Salida esperada:**
  ```javascript
  { id: 195, title: 'Remera negra', price: 29.99, category: "men's clothing" }
  ```

### 4) Eliminar un producto
* **Comando:**
  ```bash
  npm run start DELETE products/<productId>
  ```
* **Ejemplo:**
  ```bash
  npm run start DELETE products/7
  ```
* **Acción:** Petición HTTP `DELETE` a `https://dummyjson.com/products/7`.
* **Salida esperada:**
  ```javascript
  { id: 7, title: 'Chanel Coco Noir Eau De', price: 129.99, category: 'fragrances' }
  ```

---

## 🧪 Pruebas Automatizadas (Testing)

El proyecto incluye una suite de pruebas automatizadas con **Mocha** y **Chai** basadas en [Testing-Pre-Entrega-Back-End-Node-JS](https://github.com/JePaFe/Testing-Pre-Entrega-Back-End-Node-JS).

Para ejecutar los tests:
```bash
npm test
```

### Casos de prueba validados:
- ✔ **CLI GET products:** Valida la respuesta en formato array con al menos 20 productos.
- ✔ **CLI GET products/7:** Valida la estructura correcta del producto con ID 7.
- ✔ **CLI POST products:** Valida la creación de un nuevo producto con los datos provistos.
- ✔ **CLI DELETE products/7:** Valida la eliminación del producto indicado.

---

## 💡 Buenas Prácticas y Arquitectura

* **Separación de responsabilidades:**
  * `index.js`: Captura y valida los argumentos de la terminal (`process.argv`), orquesta el flujo de control con `switch` y maneja errores de invocación.
  * `productManager.js`: Encapsula las llamadas asíncronas con `fetch`, controla códigos de respuesta HTTP y normaliza los objetos.
* **Manipulación de datos (Destructuring & Spread):**
  * Desestructuración de argumentos y rutas (`const [method, route, ...args] = process.argv.slice(2)` y `const [, id] = route.split('/')`).
  * Desestructuración como filtro de propiedades en la función `formatProduct({ id, title, price, category })`.
  * *Spread operator* (`...productData`) para clonar y normalizar el payload antes de enviarlo a la API.
* **Compatibilidad defensiva:**
  * Uso de `(data.products || data)` para soportar APIs que devuelven colecciones encapsuladas (DummyJSON) o arrays directos (FakeStore).
* **Manejo de cadenas:**
  * Extracción robusta de títulos compuestos con espacios mediante `args.slice(0, -2).join(" ")`.

---

## 📋 Resumen de Comandos

| Método | Comando CLI | Endpoint DummyJSON | Descripción |
| :---: | :--- | :--- | :--- |
| **GET** | `npm run start GET products` | `GET /products` | Lista todos los productos |
| **GET** | `npm run start GET products/<id>` | `GET /products/:id` | Detalle de un producto por ID |
| **POST** | `npm run start POST products <title> <price> <category>` | `POST /products/add` | Crea un nuevo producto |
| **DELETE** | `npm run start DELETE products/<id>` | `DELETE /products/:id` | Elimina un producto por ID |
| **TEST** | `npm test` | — | Ejecuta la suite de pruebas automatizadas |
