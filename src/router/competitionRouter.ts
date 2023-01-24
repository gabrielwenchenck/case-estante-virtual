import { CompetitionController } from "./../controller/CompetitionController";
import { Router } from "express";
import { IdGenerator } from "../services/IdGenerator";
import { CompetitionDatabase } from "../database/CompetitionDatabase";
import { CompetitionBusiness } from "../business/CompetitionBusiness";

export const competitionRouter = Router();

const competitionController = new CompetitionController(
  new CompetitionBusiness(new CompetitionDatabase(), new IdGenerator())
);

competitionRouter.post("/create", competitionController.create);
competitionRouter.post("/close/:id", competitionController.close);
