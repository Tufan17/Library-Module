const UserBookModel = require("../models/UserBookModel");
const UserModel = require("../models/UserModel");
const BookModel = require("../models/BookModel");



const borrowing = async (created_by, user_id, book_id) => {
  const user = await UserModel.findId(user_id);

  if (!user) {
    return { status: "error", message: "User not found" };
  }

  const book = await BookModel.findId(book_id);

  if (!book) {
    return { status: "error", message: "Book not found" };
  } else if (book.status === "borrowing") {
    return { status: "error", message: "Book not here" };
  }

  await BookModel.update(book_id, { status: "borrowing" });

  const result = await UserBookModel.create({
    created_by,
    user_id: user_id,
    book_id: book_id,
  });
  return { status: "success", user_book_id: result };
};

const delivery = async (user_book_id)  => {

  const response = await UserBookModel.findId(user_book_id);

  if(!response){
    return { status: "error", message: "user_book_id invalid" };
  }else if(response.status=="delivered"){
    return { status: "error", message: "This book has already been delivered" };
  }

  await UserBookModel.update(user_book_id,{status:"delivered"});

  await BookModel.update(response.book_id,{status:"here"});

  return {status:"success",message:"Book delivery was successfully"};
};

const point = async (user_id,book_id,point)=>{

    const book = await BookModel.findId(book_id);

    if (!book) {
      return { status: "error", message: "Book not found" };
    }
    const userBook = await UserBookModel.findUserBook(user_id,book_id);

    if (!userBook) {
      return { status: "error", message: "User has not read this book." };
    }
    await UserBookModel.updatePoint(user_id,book_id,point);

    totalPoints(book_id);

    return {status:"succes",message:"User points have been updated"};

}

const totalPoints = async (book_id)=>{

    const response=await UserBookModel.whereUserBook(book_id);
    const totalPoints = response.reduce((total, item) => total + parseFloat(item.point), 0);

    const averagePoints = response.length > 0 ? totalPoints / response.length : 0;

    await BookModel.update(book_id,{point:`${averagePoints}`});

    return averagePoints;
  }

module.exports = {
  borrowing,
  delivery,
  point
};
