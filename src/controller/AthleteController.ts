import { Request, Response } from "express";
import { AthleteBusiness } from "../business/AthleteBusiness";
import { BaseError } from "../errors/BaseError";

export class AthleteController {
  constructor(private athleteBusiness: AthleteBusiness) {}

  public create = async (req: Request, res: Response) => {
    try {
      const name = req.body.name;
      const response = await this.athleteBusiness.create(name);
      res.status(201).send(response);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  };
}
