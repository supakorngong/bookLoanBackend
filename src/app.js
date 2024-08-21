const express = require("express");
const app = express();
const cors = require("cors");
1;
const authRouter = require("./router/authRoute");
const errorMiddleware = require("./middleware/error");
const authAdminRouter = require("./router/authAdminRoute");

require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/authAdmin", authAdminRouter);

app.use(errorMiddleware);
const port = process.env.PORT;

app.listen(port, console.log(`hello from ${port}`));
