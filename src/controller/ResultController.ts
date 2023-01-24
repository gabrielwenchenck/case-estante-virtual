import { Request, Response } from "express";
import { ResultBusiness } from "../business/ResultBusiness";
import { BaseError } from "../errors/BaseError";
import { ICreateResultInputDTO } from "../models/Result";

export class ResultController {
  constructor(private resultBusiness: ResultBusiness) {}

  public create = async (req: Request, res: Response) => {
    try {
      const input: ICreateResultInputDTO = {
        value: req.body.value,
        value_2: req.body.value_2,
        value_3: req.body.value_3,
        unit: req.body.unit,
        competitionId: req.body.competitionId,
        athleteId: req.body.athleteId,
      };
      const response = await this.resultBusiness.create(input);
      res.status(201).send(response);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  };
  public getResults = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const response = await this.resultBusiness.getResults(id);
      res.status(201).send(response);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  };
}
