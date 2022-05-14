import dotenv from "dotenv";
import { AddressInfo } from "net";
import express from "express";
import { userRouter } from "./routes/userRouter";
import { bandRouter } from "./routes/bandRouter";
import { showRouter } from "./routes/showRouter";
import { ticketRouter } from "./routes/ticketRouter";
dotenv.config();
const app = express();

app.use(express.json() as express.RequestHandler);

app.use("/user", userRouter);
app.use("/band", bandRouter);
app.use("/show", showRouter);
app.use("/ticket", ticketRouter);

const server = app.listen(3000, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Servidor rodando em http://localhost:${address.port}`);
  } else {
    console.error(`Falha ao rodar o servidor.`);
  }
});
