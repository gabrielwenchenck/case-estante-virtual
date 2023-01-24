import { Athlete } from "./../models/Athlete";
import { IdGenerator } from "./../services/IdGenerator";
import { AthleteDatabase } from "../database/AthleteDatabase";
import { ParamsError } from "../errors/ParamsError";

export class AthleteBusiness {
  constructor(
    private athleteDatabase: AthleteDatabase,
    private idGenerator: IdGenerator
  ) {}

  public create = async (name: string) => {
    if (!name) {
      throw new ParamsError();
    }

    if (typeof name !== "string") {
      throw new ParamsError("Parâmetro 'name' inválido: deve ser uma string");
    }

    const id = this.idGenerator.generate();

    const athlete = new Athlete(id, name);

    await this.athleteDatabase.createAthlete(athlete);

    const response = {
      message: "Atleta cadastrado com sucesso",
    };

    return response;
  };
}
