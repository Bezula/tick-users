import cookieSession from "cookie-session";
import express, { json } from "express";
import { createRouter } from "./routes/create";
import { currentUser, errorHandler } from "@ultickets/common";
import { usersRouter } from "./routes/users";

const app = express();

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(currentUser);

app.use(createRouter);
app.use(usersRouter);
app.use(errorHandler);

export default app;
