export default class CartDTO {
    constructor(cart) {
      this.products = cart.products.map(product => ({
        product: product.product,
        quantity: product.quantity
      }));
    }
  }
  