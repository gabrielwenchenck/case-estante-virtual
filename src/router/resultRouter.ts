import { Router } from "express";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { ResultController } from "../controller/ResultController";
import { ResultBusiness } from "../business/ResultBusiness";
import { ResultDatabase } from "../database/ResultDatabase";

export const resultRouter = Router();

const resultController = new ResultController(
  new ResultBusiness(new ResultDatabase(), new IdGenerator())
);

resultRouter.post("/create", resultController.create);
resultRouter.get("/ranking/:id", resultController.getResults);
