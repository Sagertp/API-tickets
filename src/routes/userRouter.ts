import express from "express";
import {
  createUser,
  findAllUser,
  findOneUser,
  updateUser,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/", findAllUser);

userRouter.get("/:id", findOneUser);

userRouter.post("/", createUser);

userRouter.put("/:id", updateUser);

export { userRouter };
