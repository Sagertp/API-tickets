import express from "express";
import { validateUser } from "../controllers/loginController";
import { notFound } from "../middleware/notFound";

const loginRouter = express.Router();

loginRouter.post("/", validateUser, notFound,);

export { loginRouter };
