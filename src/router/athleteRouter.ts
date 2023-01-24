import { Router } from "express";
import { IdGenerator } from "../services/IdGenerator";
import { AthleteController } from "../controller/AthleteController";
import { AthleteBusiness } from "../business/AthleteBusiness";
import { AthleteDatabase } from "../database/AthleteDatabase";

export const athleteRouter = Router();

const athleteController = new AthleteController(
  new AthleteBusiness(new AthleteDatabase(), new IdGenerator())
);

athleteRouter.post("/create", athleteController.create);
