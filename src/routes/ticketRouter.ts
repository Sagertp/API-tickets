import express from "express";
import {
  createTicket,
  findAllTicket,
  findOneTicket,
  updateTicket,
} from "../controllers/ticketController";

const ticketRouter = express.Router();

ticketRouter.get("/", findAllTicket);

ticketRouter.get("/:id", findOneTicket);

ticketRouter.post("/", createTicket);

ticketRouter.put("/:id", updateTicket);

export { ticketRouter };
