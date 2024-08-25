const express = require("express");
const { formatApiResponse } = require("../src/utils/responseFormatter");
const userRoute = require('../src/routes/userRouter');
const bookRoute = require('../src/routes/bookRouter');
const UserBookController = require('../src/controller/UserBookController');
const AuthController = require('../src/controller/AuthController');
const { isAuth } = require("../src/middlewares/authMiddleware");

const apiRouter = express.Router();

apiRouter.post("/", (req, res, next) => {
    const response = formatApiResponse(
        req,
        "Api Viewing",
        "Getting Api list with ids and names",
        ""
    );
    res.json(response);
});

apiRouter.post('/login', AuthController.login);

apiRouter.use(isAuth);

apiRouter.post('/logout', AuthController.logout);

apiRouter.use('/user', userRoute);
apiRouter.use('/book', bookRoute);

apiRouter.post('/borrowing', UserBookController.borrowing);
apiRouter.post('/delivery', UserBookController.delivery);
apiRouter.post('/points', UserBookController.points);

module.exports = { apiRouter };
