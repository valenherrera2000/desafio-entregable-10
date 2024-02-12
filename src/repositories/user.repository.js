import UserDTO from '../dto/user.dto.js';

export default class UserRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async getAll(filter = {}) {
        const users = await this.dao.getAll(filter);
        return users.map(user => new UserDTO(user));
    }

    async getById(id) {
        const user = await this.dao.getById(id);
        return new UserDTO(user);
    }

    async create(data) {
        const user = await this.dao.create(data);
        return new UserDTO(user);
    }

    async updateById(id, data) {
        return this.dao.updateById(id, data);
    }

    async deleteById(id) {
        return this.dao.deleteById(id);
    }
}
