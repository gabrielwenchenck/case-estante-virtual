import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pingRouter } from "./router/pingRouter";
import { competitionRouter } from "./router/competitionRouter";
import { athleteRouter } from "./router/athleteRouter";
import { resultRouter } from "./router/resultRouter";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.listen(process.env.PORT || 3003, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3003}`);
});

app.use("/ping", pingRouter);
app.use("/competition", competitionRouter);
app.use("/athlete", athleteRouter);
app.use("/result", resultRouter);
