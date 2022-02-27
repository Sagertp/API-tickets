import { Request, Response } from "express";
import * as userModel from "../models/user";
import { User } from "../types/user";
import { rowError } from "../middleware/handleErrors";

export const findAllUser = async (req: Request, res: Response) => {
  userModel.findAll((err: Error, users: User[]) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    }

    res.status(200).json({ data: users });
  });
};

export const findOneUser = async (req: Request, res: Response) => {
  const userId: number = Number(req.params.id);
  userModel.findOne(userId, (err: Error, user: User) => {
    if (err) {
      return rowError(err, res);
    }

    res.status(200).json({ data: user });
  });
};

export const createUser = async (req: Request, res: Response) => {
  const newUser: User = req.body;
  userModel.create(newUser, (err: Error, userId: number) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    res.status(200).json({ userId: userId });
  });
};

export const updateUser = async (req: Request, res: Response) => {
  const user: User = req.body;
  userModel.update(user, (err: Error) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    res.status(200).send();
  });
};
