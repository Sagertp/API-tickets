import express from "express";
import cors from "cors";
import * as bodyParser from "body-parser";
import { orderRouter } from "./routes/orderRouter";
import { PORT } from "./utils/config";
import { userRouter } from "./routes/userRouter";
import { ticketRouter } from "./routes/ticketRouter";
import { notFound } from "./middleware/notFound";
import { loginRouter } from "./routes/loginRouter";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/login", loginRouter);
app.use("/orders", orderRouter);
app.use("/users", userRouter);
app.use("/tickets", ticketRouter);
app.use(notFound);

app.listen(PORT, () => {
  console.log(`
.::: .::::::          .::                 .::                    .:       .:::::::  .::
     .::     .:       .::                 .::                   .: ::     .::    .::.::
     .::          .:::.::  .::   .::    .:.: .: .::::          .:  .::    .::    .::.::
     .::    .:: .::   .:: .::  .:   .::   .::  .::            .::   .::   .:::::::  .::
     .::    .::.::    .:.::   .::::: .::  .::    .:::        .:::::: .::  .::       .::
     .::    .:: .::   .:: .:: .:          .::      .::      .::       .:: .::       .::
     .::    .::   .:::.::  .::  .::::      .:: .:: .::     .::         .::.::       .::
                                                                                       

Tickes API is started running on port: ${PORT}`);
});
