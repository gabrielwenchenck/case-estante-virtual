import { Request, Response } from "express";
import { CompetitionBusiness } from "../business/CompetitionBusiness";
import { BaseError } from "../errors/BaseError";

export class CompetitionController {
  constructor(private competitionBusiness: CompetitionBusiness) {}

  public create = async (req: Request, res: Response) => {
    try {
      const name = req.body.name;
      const attempts = req.body.attempts;

      const response = await this.competitionBusiness.create(name, attempts);
      res.status(201).send(response);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  };
  public close = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const response = await this.competitionBusiness.close(id);
      res.status(201).send(response);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  };
}
