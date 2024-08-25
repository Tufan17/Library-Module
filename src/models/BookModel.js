const BaseModel = require('./BaseModel');

class BookModel extends BaseModel {

  constructor() {
    super('books');
  }

}

module.exports = new BookModel();
