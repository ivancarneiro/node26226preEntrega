function formatProduct({ id, title, price, category }) {
  return { id, title, price, category };
}

export async function getProducts(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error al obtener los productos");
    }

    const products = (data.products || data).map(formatProduct);
    console.log(products);
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
  }
}

export async function getProductById(url, id) {
  try {
    const response = await fetch(`${url}/${encodeURIComponent(id)}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Producto no encontrado");
    }

    console.log(formatProduct(data));
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
  }
}

export async function addProduct(url, productData) {
  try {
    const { price } = productData;

    const response = await fetch(`${url}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...productData,
        price: Number(price),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error al agregar el producto");
    }

    console.log(formatProduct(data));
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
  }
}

export async function deleteProduct(url, id) {
  try {
    const response = await fetch(`${url}/${encodeURIComponent(id)}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error al eliminar el producto");
    }

    console.log(formatProduct(data));
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
  }
}