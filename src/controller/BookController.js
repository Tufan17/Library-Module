const bookServices = require('../services/bookServices');
const { formatApiResponse } = require('../utils/responseFormatter');

const index = async (req, res, next) => {
  try {
    const books = await bookServices.getAllBooks(); 
    const response = formatApiResponse(
      req,
      "Book List Request",
      "Book List Request Success.",
      JSON.stringify(books)
    );
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, point, status } = req.body;
    let response;

    try {
      const user = req.session.user;

      if (user.role_id !== 1) {
        const response = formatApiResponse(
          req,
          "Book Create Request",
          `Book Create Request Error: The user must be an admin to perform this operation. `,
          "",
          400
        );
        res.status(400).json(response);
        return;
      } 
      await bookServices.createBook({ name, point, status });
      response = formatApiResponse(
        req,
        "Book Create Request",
        "Book Create Request Success: Book created successfully",
        JSON.stringify({ name, point, status })
      );
      res.status(200).json(response);
    } catch (error) {
      response = formatApiResponse(
        req,
        "Book Create Request",
        `Book Create Request Error: ${error.message}`,
        "",
        400
      );
      res.status(400).json(response);
    }
  } catch (error) {
    next(error);
  }
};

const read = async (req, res, next) => {
  try {
    const { id } = req.body;
    if (!id) {
      const response = formatApiResponse(
        req,
        "Book Read Request",
        "Book Read Request Error: You must send a book ID.",
        "",
        400
      );
      res.status(400).json(response);
      return;
    }
    const data = await bookServices.getBookById(id);
    if (!data) {
      const response = formatApiResponse(
        req,
        "Book Read Request",
        "Book Read Request Error: No book found.",
        "",
        404
      );
      res.status(404).json(response);
    } else {
      const response = formatApiResponse(
        req,
        "Book Read Request",
        "Book Read Request Success.",
        JSON.stringify(data)
      );
      res.status(200).json(response);
    }
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id, name, point, status } = req.body;
    try {
      const user = req.session.user;

      if (user.role_id !== 1) {
        const response = formatApiResponse(
          req,
          "Book Update Request",
          `Book Update Request Error: The user must be an admin to perform this operation. `,
          "",
          400
        );
        res.status(400).json(response);
        return;
      }    
      await bookServices.updateBook(id, { name, point, status });
      const response = formatApiResponse(
        req,
        "Book Update Request",
        "Book Update Request Success.",
        JSON.stringify({ id, name, point, status })
      );
      res.status(200).json(response);
    } catch (error) {
      const response = formatApiResponse(
        req,
        "Book Update Request",
        `Book Update Request Error: ${error.message}`,
        "",
        400
      );
      res.status(400).json(response);
    }
  } catch (error) {
    next(error);
  }
};

const destroy= async (req, res, next) => {
  try {
    const user = req.session.user;
    const { user_id } = req.body;

    if (user.role_id !== 1) {
      const response = formatApiResponse(
        req,
        "Book Delete Request",
        `Book Delete Request Error: The user must be an admin to perform this operation. `,
        "",
        400
      );
      res.status(400).json(response);
      return;
    }    

    const data =await bookServices.destroyBook(user_id);
    
    if(data.status ==='success') {
      const response = formatApiResponse(
        req,
        "Book Delete Request",
        `Book Delete Request Error: `+data.message,
        "",
        200
      );
      res.status(200).json(response);
    }else{
      const response = formatApiResponse(
        req,
        "Book Delete Request",
        `Book Delete Request Error: `+data.message,
        "",
        400
      );
      res.status(400).json(response);
    }

  } catch (error) {
    const response = formatApiResponse(
      req,
      "Book Delete Request",
      `Book Delete Request Error: ${error.message}`,
      "",
      400
    );
    res.status(400).json(response);
  }
}

module.exports = {
  index,
  create,
  read,
  update,
  destroy
};
