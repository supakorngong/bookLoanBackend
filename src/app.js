const express = require("express");
const app = express();
const cors = require("cors");
const authRouter = require("./router/authRoute");
const errorMiddleware = require("./middleware/error");
const authAdminRouter = require("./router/authAdminRoute");
const loanRouter = require("./router/loanRoute");
const bookRouter = require("./router/bookRoute");
const checkRole = require("./middleware/checkRole");
const categoryRouter = require("./router/categoryRoute");
const customerRouter = require("./router/customerRoute");
const loanItemRouter = require("./router/loanItemRoute");

require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/authAdmin", authAdminRouter);
app.use("/loan", loanRouter);
app.use("/loanItem", loanItemRouter);
app.use("/book", bookRouter);
app.use("/category", checkRole, categoryRouter);
app.use("/customer", checkRole, customerRouter);

app.use(errorMiddleware);

const port = process.env.PORT;

app.listen(port, console.log(`running on ${port}`));
