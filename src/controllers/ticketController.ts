import { Request, Response } from "express";
import * as ticketModel from "../models/ticket";
import { Ticket } from "../types/ticket";
import { rowError } from "../middleware/handleErrors";

export const findAllTicket = async (req: Request, res: Response) => {
  ticketModel.findAll((err: Error, tickets: Ticket[]) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    }

    res.status(200).json({ data: tickets });
  });
};

export const createTicket = async (req: Request, res: Response) => {
  const newTicket: Ticket = req.body;
  ticketModel.create(newTicket, (err: Error, ticketId: number) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    res.status(200).json({ ticketId: ticketId });
  });
};

export const findOneTicket = async (req: Request, res: Response) => {
  const ticketId: number = Number(req.params.id);
  ticketModel.findOne(ticketId, (err: Error, ticket: Ticket) => {
    if (err) {
      return rowError(err, res);
    }
    res.status(200).json({ data: ticket });
  });
};

export const updateTicket = async (req: Request, res: Response) => {
  const ticket: Ticket = req.body;
  ticketModel.update(ticket, (err: Error) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    res.status(200).send();
  });
};
