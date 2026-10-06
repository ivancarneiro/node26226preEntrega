import { getProducts, getProductById, addProduct, deleteProduct } from "./productManager.js";

const [method, route, ...args] = process.argv.slice(2);

if (!method || !route) {
  console.log("❌ Error: Comando incompleto.");
  console.log("Uso:");
  console.log("  GET products");
  console.log("  GET products/<productId>");
  console.log("  POST products <title> <price> <category>");
  console.log("  DELETE products/<productId>");
  process.exit(1);
}

const [, id] = route.split("/");
const URL = "https://dummyjson.com/products";

async function main() {
  switch (method.toUpperCase()) {
    case "GET":
      if (id) {
        await getProductById(URL, id);
      } else {
        await getProducts(URL);
      }
      break;

    case "POST": {
      if (args.length < 3) {
        console.log("❌ Error: Faltan datos para crear el producto.");
        console.log("Uso: npm start POST products <title> <price> <category>");
        process.exit(1);
      }

      const price = args.at(-2);
      const category = args.at(-1);
      const title = args.slice(0, -2).join(" ");

      if (!title || !price || !category) {
        console.log("❌ Error: Faltan datos para crear el producto.");
        console.log("Uso: npm start POST products <title> <price> <category>");
        process.exit(1);
      }

      const newProduct = {
        title,
        price,
        category,
      };

      await addProduct(URL, newProduct);
      break;
    }

    case "DELETE":
      if (!id) {
        console.log("❌ Error: Debes indicar el ID a eliminar.");
        console.log("Uso: npm start DELETE products/<productId>");
        process.exit(1);
      }
      await deleteProduct(URL, id);
      break;

    default:
      console.log(`❌ Error: Método '${method}' no soportado.`);
      break;
  }
}

main().catch((error) => {
  console.log(`❌ Error: ${error.message}`);
  process.exit(1);
});
