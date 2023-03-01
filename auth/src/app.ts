import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.set("trust proxy", true); // to tell the application to trust the incoming traffic as being secure
app.use(json());
app.use(
	cookieSession({
		signed: false,
		// secure: true, // means we must be on https connection
		secure: process.env.NODE_ENV !== "test", // this is done so that test can be done without sending secure request
	})
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.all("*", async () => {
	throw new NotFoundError();
});
app.use(errorHandler);

export { app };
