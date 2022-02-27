import { Response } from "express";

export const ERROR_HANDLERS = {
  CastError: (res: Response) =>
    res.status(400).send({ error: "id used is malformed" }),

  /*ValidationError: (res: Response, { message }) =>
    res.status(409).send({ error: message }),*/

  JsonWebTokenError: (res: Response) =>
    res.status(401).json({ error: "token missing or invalid" }),

  TokenExpirerError: (res: Response) =>
    res.status(401).json({ error: "token expired" }),

  /*defaultError: (res: Response, error) => {
    console.error(error.name)
    res.status(500).end()
  }*/
};

export const rowError = (err: Error, res: Response) => {
  res.status(404).json( err.message );
};
