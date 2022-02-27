import { Request, Response, NextFunction } from "express";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const err = new Error('Not Found');
  res.status(404).json( err.message ).end()
}
