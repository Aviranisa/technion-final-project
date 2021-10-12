const express = require("express");
const loginRouter = require("./routers/loginRouter");
const moviesRouter = require("./routers/moviesRouter");
const membersRouter = require("./routers/membersRouter");
const subscriptionRouter = require("./routers/subscriptionRouter");
const authRouter = require("./routers/authenticatedRouter");
const auth = require("./services/authenticatedBL.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

require("./configs/DBconect");
app.use("/api/login", loginRouter);
app.use("/api/movies", auth.verify, moviesRouter);
app.use("/api/members", auth.verify, membersRouter);
app.use("/api/subscriptions", auth.verify, subscriptionRouter);
app.use("/api/auth", auth.verify, authRouter);
app.use(function (req, res, next) {
	res.status(404).send("Wrong endpoint");
});

app.listen(2000);
