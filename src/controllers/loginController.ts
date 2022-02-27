import { matchPass } from "../utils/helperPass";
import { Request, Response } from "express";
import { rowError } from "../middleware/handleErrors";
import { User } from "../types/user";
import * as userModel from "../models/user";
import { helpJWT } from "../utils/helpesJWT";

export const validateUser = async (req: Request, res: Response) => {
  const email: string = req.body.email;
  const psw: string = req.body.password;

  userModel.findByUsername(email, async (err: Error, user: User) => {
    if (err) {
      return rowError(err, res);
    }
    try {
      let savedPassword = user.password || "";
      let match = await matchPass(psw, savedPassword);

      if (!match) {
        res.status(401).json({ Message: "The user or password is worng." });
      }

      let userForToken = {
        id_user: user.id_user,
        id_type_user: user.id_type_user,
        name: user.name,
        email: user.email,
      };

      const token = helpJWT(userForToken);
      console.log(token);


      res.status(200).json({ jwtToken: token });
    } catch (err) {}
  });
};
