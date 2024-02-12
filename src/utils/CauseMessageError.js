// cart cause message

export const generatorCartError = (cart) => {
  return `Error in the cart. Details:
    - products: ${JSON.stringify(cart.products)}
  `;
};


//product cause message

export const generatorProductError = (product) => {
  return `Error in the product. Details:
    - title: ${product.title}
    - description: ${product.description}
    - price: ${product.price}
    - thumbnail: ${product.thumbnail}
    - code: ${product.code}
    - stock: ${product.stock}
  `;
};
