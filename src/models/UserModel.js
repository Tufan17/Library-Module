const BaseModel = require('./BaseModel');
const connection = require('../database/connection');

class UserModel extends BaseModel {
  constructor() {
    super('users');
  }

  async findByEmail(email) {
    const user = await connection
      .table(this.modelName)
      .where('email', email)
      .whereNull('deleted_at')
      .first();
    return user;
  }
}

module.exports = new UserModel();
