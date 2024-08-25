const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const http = require("http");
const cors = require("cors");
const multer = require("multer");
const { apiRouter } = require("./routes/api");
const { webRouter } = require("./routes/web");

dotenv.config();
const upload = multer();
const app = express();
const port = parseInt(process.env.PORT, 10);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
require("./src/configs/configuration.js")(app);


const corsOptions = {
  origin: "*", //["http://localhost:8000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));

app.use("/", webRouter);
app.use("/api", upload.none(), apiRouter);


const server = http.createServer(app);

server.listen(port, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);
