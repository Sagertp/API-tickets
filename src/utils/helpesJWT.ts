import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET } from "./config";
import { UserForToken } from "../types/user";

const tokenSecret = SECRET || "1qazxsw2*-";

export const helpJWT = (userForToken: UserForToken) => {
  console.log("JWT is Created...!");
  return jwt.sign(userForToken, tokenSecret, { expiresIn: 60 * 60 * 24 * 7 });
};

export const userExtractor = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.get("authorization");
  let token = "";
  let decodedToken;

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.substring(7);
    try {
      decodedToken = JSON.stringify(jwt.verify(token, tokenSecret));
    } catch (e) {
      return res.status(401).json({ error: "token missing or invalid" });
    }
  }

  if (!decodedToken) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  next();
};
