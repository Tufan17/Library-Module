const connection = require('../database/connection');
const HashPassword = require('../utils/hashPassword');

class BaseModel {
  constructor(modelName) {
    this.modelName = modelName;
  }

  async create(data) {
    if (this.modelName === 'users' && data.password) {
      data.password = await HashPassword(data.password);
    }
    const result = await connection.table(this.modelName).insert(data);
    return result;
  }

  async update(id, data) {
    if (data.password) {
      data.password = await HashPassword(data.password);
    }
    const result = await connection
      .table(this.modelName)
      .where({ id })
      .whereNull('deleted_at')
      .update(data);
    return result;
  }

  async getAll() {
    const data = await connection.table(this.modelName).whereNull('deleted_at');
    return data;
  }

  async findId(id) {
    const data = await connection
      .table(this.modelName)
      .where({ id })
      .whereNull('deleted_at')
      .first();
    return data;
  }


  async where(column,val) {
    const data = await connection
      .table(this.modelName)
      .where(column,val)
      .whereNull('deleted_at')
      .select();
    return data;
  }

  async getByIdAll(id) {
    const data = await connection
      .table(this.modelName)
      .where({ id })
      .whereNull('deleted_at')
      .select();
    return data;
  }

  async pluck(columnName) {
    const data = await connection
      .table(this.modelName)
      .whereNull('deleted_at')
      .pluck(columnName);
    return data;
  }

  async delete(id) {
    const result = await connection
      .table(this.modelName)
      .where({ id })
      .whereNull('deleted_at')
      .update({ deleted_at: new Date() });
    return result;
  }

  async increment(id, columnName, value) {
    const result = await connection
      .table(this.modelName)
      .where({ id })
      .whereNull('deleted_at')
      .increment(columnName, value);
    return result;
  }

  async decrement(id, columnName, value) {
    const result = await connection
      .table(this.modelName)
      .where({ id })
      .whereNull('deleted_at')
      .decrement(columnName, value);
    return result;
  }

  async count() {
    const data = await connection
      .table(this.modelName)
      .whereNull('deleted_at')
      .count('id as total')
      .first();
    return data?.total ?? 0;
  }

  async oneToOne(id, relationModel, relationColumn) {
    const data = await connection
      .table(this.modelName)
      .where({ id })
      .whereNull('deleted_at')
      .first()
      .join(
        relationModel,
        `${this.modelName}.${relationColumn}`,
        '=',
        `${relationModel}.id`
      )
      .select(`${this.modelName}.*`, `${relationModel}.*`);
    return data;
  }

  async manyToOne(relationModel, relationColumn) {
    const data = await connection
      .table(this.modelName)
      .whereNull('deleted_at')
      .first()
      .join(
        relationModel,
        `${this.modelName}.${relationColumn}`,
        '=',
        `${relationModel}.id`
      )
      .select(`${this.modelName}.*`, `${relationModel}.*`);
    return data;
  }

  async oneToMany(id, relationModel, relationColumn) {
    const data = await connection
      .table(this.modelName)
      .where({ id })
      .whereNull('deleted_at')
      .join(
        relationModel,
        `${this.modelName}.${relationColumn}`,
        '=',
        `${relationModel}.id`
      )
      .select(`${this.modelName}.*`, `${relationModel}.*`);
    return data;
  }

  async manyToMany(relationModel, relationThisColumn, relationOtherColumn, relationOtherModel) {
    const data = await connection
      .table(this.modelName)
      .whereNull('deleted_at')
      .join(
        relationModel,
        `${this.modelName}.${relationThisColumn}`,
        '=',
        `${relationModel}.id`
      )
      .join(
        relationOtherModel,
        `${relationModel}.${relationOtherColumn}`,
        '=',
        `${relationOtherModel}.id`
      )
      .select(`${this.modelName}.*`, `${relationModel}.*`, `${relationOtherModel}.*`);
    return data;
  }
}

module.exports = BaseModel;
