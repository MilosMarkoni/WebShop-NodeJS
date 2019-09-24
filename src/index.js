const express = require("express");
const port = process.env.PORT;

const db = require("./db/mongodb");
require("./db/mongoose");

const auth = require("./middleware/auth");

const productRouter = require("./routers/productRouter");
const categoryRouter = require("./routers/categoryRouter");
const userRouter = require("./routers/userRouter");
const purchaseRouter = require("./routers/purchaseRouter");
const loginRouter = require("./routers/loginRouter");

const app = express();
app.use(express.json());

app.use("/store/product", auth, productRouter);
app.use("/store/category", auth, categoryRouter);
app.use("/store/user", auth, userRouter);
app.use("/store/purchase", auth, purchaseRouter);
app.use("/store/purchase", auth, purchaseRouter);
app.use("/auth/authenticateUser", loginRouter);

db.connect(() => app.listen(port || 3000, () => console.log(`Listening on ${port}`)));
