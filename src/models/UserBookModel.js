const BaseModel = require('./BaseModel');
const connection = require('../database/connection');

class UserBookModel extends BaseModel {

  constructor() {
    super('user_book');
  }

  async findUserBook(user_id,book_id) {
    const user_book = await connection
      .table(this.modelName)
      .where('user_id', user_id)
      .where('book_id', book_id)
      .whereNull('deleted_at')
      .first();
    return user_book;
  }

  async updatePoint(user_id,book_id,point) {
    const user_book = await connection
      .table(this.modelName)
      .where('user_id', user_id)
      .where('book_id', book_id)
      .whereNull('deleted_at')
      .update({point:point});
    return user_book;
  }

  async whereUserBook(book_id) {
    const data = await connection
      .table(this.modelName)
      .distinct('user_id')
      .where("book_id",book_id)
      .whereNull('deleted_at')
      .select('point');
    return data;
  }

  async findBook(book_id) {
    const user_book = await connection
      .table(this.modelName)
      .where('book_id', book_id)
      .where('status', "borrowed")
      .whereNull('deleted_at')
      .select();
    return user_book;
  }

}

module.exports = new UserBookModel();
