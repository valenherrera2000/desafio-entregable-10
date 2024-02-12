import CartDTO from '../dto/cart.dto.js';

export default class CartRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async getAll(filter = {}) {
        const carts = await this.dao.get(filter);
        return carts.map(cart => new CartDTO(cart));
    }

    async create(data) {
        const cart = await this.dao.create(data);
        return new CartDTO(cart);
    }

    async updateById(id, data) {
        return this.dao.updateById(id, data);
    }

    async deleteById(id) {
        return this.dao.deleteById(id);
    }
}
