const { formatApiResponse } = require("../utils/responseFormatter");
const validator = require("validator");
const userBookService = require("../services/userBookService");
const { response } = require("express");
const UserBookModel = require("../models/UserBookModel");
const borrowing = async (req, res, next) => {
  try {
    const user=req.session.user;
    const {user_id,book_id}=req.body;
    if (!user_id || !validator.isInt(user_id.toString(), { min: 1 })) {
      const response = formatApiResponse(
        req,
        "Book Borrowing Request",
        "Invalid or missing user ID.",
        "",
        400
      );
      return res.status(400).json(response);
    }else if (!book_id || !validator.isInt(book_id.toString(), { min: 1 })) {
      const response = formatApiResponse(
        req,
        "Book Borrowing Request",
        "Invalid or missing book ID.",
        "",
        400
      );
      return res.status(400).json(response);
    }else if(!user){
      const response = formatApiResponse(
        req,
        "Book Borrowing Request",
        "Book Borrowing Request Err: Auth user not found.",
        ""
      );
      res.status(400).json(response);
      return ;
    }else if(user.role_id !==1 ){
      
      const response = formatApiResponse(
        req,
        "Book Borrowing Request",
        "Book Borrowing Request Err: Auth user role not admin.",
        ""
      );
      res.status(400).json(response);
      return ;
    }else{
      const result=await userBookService.borrowing(user.id,parseInt(user_id),parseInt(book_id));
      if(result.status === 'error'){
        const response = formatApiResponse(
          req,
          "Book Borrowing Request",
          "Book Borrowing Request Err Message: "+result.message,
          JSON.stringify(result)
        );
        res.status(400).json(response);
        return;
      }
      const response = formatApiResponse(
        req,
        "Book Borrowing Request",
        "Book Borrowing Request Success.",
        JSON.stringify(result)
      );
      res.status(200).json(response);
      return;

    }
    
  } catch (error) {
    next(error);
  }
};

const delivery = async (req, res, next) => {
  try {
    const user=req.session.user;
    const {user_book_id}=req.body;
    if (!user_book_id || !validator.isInt(user_book_id.toString(), { min: 1 })) {
      const response = formatApiResponse(
        req,
        "Book Delivery Request",
        "Invalid or missing user ID.",
        "",
        400
      );
      return res.status(400).json(response);
    }else if(!user){
      const response = formatApiResponse(
        req,
        "Book Delivery Request",
        "Book Delivery Request Err: Auth user not found.",
        ""
      );
      res.status(400).json(response);
      return ;
    }else if(user.role_id !==1 ){
      
      const response = formatApiResponse(
        req,
        "Book Delivery Request",
        "Book Delivery Request Err: Auth user role not admin.",
        ""
      );
      res.status(400).json(response);
      return ;
    }else{
      const result=await userBookService.delivery(parseInt(user_book_id));
      if(result.status === 'error'){
        const response = formatApiResponse(
          req,
          "Book Delivery Request",
          "Book Delivery Request Err Message: "+result.message,
          JSON.stringify(result)
        );
        res.status(400).json(response);
        return;
      }
      const response = formatApiResponse(
        req,
        "Book Delivery Request",
        "Book Delivery Request Success.",
        JSON.stringify(result)
      );
      res.status(200).json(response);
      return;

    }
  } catch (error) {
    next(error);
  }
};

const points = async (req, res, next) => {
  try {
    const {book_id,point}=req.body;
    const user=req.session.user;
    
    if (!book_id || !validator.isInt(book_id.toString(), { min: 1 })) {
      const response = formatApiResponse(
        req,
        "Book Point Request",
        "Invalid or missing book ID.",
        "",
        400
      );
      return res.status(400).json(response);
    }else if (!point || !validator.isInt(point.toString(), { min: 1 })) {
      const response = formatApiResponse(
        req,
        "Book Point Request",
        "Invalid or missing point.",
        "",
        400
      );
      return res.status(400).json(response);
    }else if(!user){
      const response = formatApiResponse(
        req,
        "Book Point Request",
        "Book Point Request Err: Auth user not found.",
        ""
      );
      res.status(400).json(response);
      return ;
    }else{
      const result=await userBookService.point(110,parseInt(book_id),parseInt(point));
      if(result.status === 'error'){
        const response = formatApiResponse(
          req,
          "Book Point Request",
          "Book Point Request Err Message: "+result.message,
          JSON.stringify(result)
        );
        res.status(400).json(response);
        return;
      }
      const response = formatApiResponse(
        req,
        "Book Point Request",
        "Book Point Request Success.",
        JSON.stringify(result)
      );
      res.status(200).json(response);
      return;

    }
    
  } catch (error) {
    next(error);
  }
};



module.exports = {
  borrowing,
  delivery,
  points
};
