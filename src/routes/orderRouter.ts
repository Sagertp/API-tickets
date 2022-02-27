import express from "express";
import {
  createOrder,
  findAllOrder,
  findOneOrder,
  findByIdUser,
  updateOrder,
} from "../controllers/orderController";
import {notFound} from "../middleware/notFound";
import { userExtractor } from "../utils/helpesJWT";

const orderRouter = express.Router();

orderRouter.get("/", [userExtractor], findAllOrder);

orderRouter.get("/:id", userExtractor, findByIdUser, notFound);

orderRouter.post("/", createOrder);

orderRouter.put("/:id", updateOrder);

export { orderRouter };
