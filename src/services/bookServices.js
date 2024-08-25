const BookModel = require('../models/BookModel');
const UserBookModel = require('../models/UserBookModel');

const getAllBooks = async () => {
  return await BookModel.getAll();
};

const createBook = async (book) => {
  return await BookModel.create(book);
};

const updateBook = async (id, book) => {
  if (!id) {
    throw new Error('Book ID is required');
  }

  return await BookModel.update(id, book);
};

const getBookById = async (id) => {
  if (!id) {
    throw new Error('Book ID is required');
  }
  return await BookModel.findId(id);
};

const destroyBook = async (id) => {

 const data= await UserBookModel.findBook(id);
if(data.length == 0) {
  BookModel.delete(id);
  return {status:"success",message:"Book deleted successfully"}
}
return {status:"errr",message:"Book not deleted because book not here"};
}

module.exports = {
  getAllBooks,
  createBook,
  updateBook,
  getBookById,
  destroyBook
};
