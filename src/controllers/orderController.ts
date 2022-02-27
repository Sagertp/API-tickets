import { Request, Response } from "express";
import * as orderModel from "../models/order";
import { Order, BasicOrder } from "../types/order";
import { rowError } from "../middleware/handleErrors";

export const createOrder = async (req: Request, res: Response) => {
  const newOrder: BasicOrder = req.body;
  orderModel.create(newOrder, (err: Error, orderId: number) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    res.status(200).json({ orderId: orderId });
  });
};

export const findAllOrder = async (req: Request, res: Response) => {
  orderModel.findAll((err: Error, orders: Order[]) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    }

    res.status(200).json({ data: orders });
  });
};

export const findOneOrder = async (req: Request, res: Response) => {
  console.log('en el controler: ', req.params )
  const orderId: number = Number(req.params.id);
  orderModel.findOne(orderId, (err: Error, order: Order) => {
    if (err) {
      return rowError(err, res);
    }

    res.status(200).json({ data: order });
  });
};


export const findByIdUser = async (req: Request, res: Response) => {
  const id_user: number = Number(req.params.id);
  orderModel.findByIdUser(id_user, (err: Error, order: Order) => {
    if (err) {
      return rowError(err, res);
    }

    res.status(200).json(order);
  });
};


export const updateOrder = async (req: Request, res: Response) => {
  const order: Order = req.body;
  orderModel.update(order, (err: Error) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    res.status(200).send();
  });
};
