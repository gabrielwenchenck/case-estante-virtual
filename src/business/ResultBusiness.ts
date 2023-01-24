import { IdGenerator } from "./../services/IdGenerator";
import { ResultDatabase } from "../database/ResultDatabase";
import { ICreateResultInputDTO, Result } from "../models/Result";
import { ParamsError } from "../errors/ParamsError";
import { NotFoundError } from "../errors/NotFoundError";
import { off } from "process";
import { ConflictError } from "../errors/ConflictError";

export class ResultBusiness {
  constructor(
    private resultDatabase: ResultDatabase,
    private idGenerator: IdGenerator
  ) {}

  public create = async (input: ICreateResultInputDTO) => {
    const { value, value_2, value_3, unit, competitionId, athleteId } = input;

    const isThreeAttempts = await this.resultDatabase.findCompetitionByAttempts(
      competitionId
    );

    if (isThreeAttempts) {
      if (!value || !value_2 || !value_3) {
        throw new ParamsError(
          "Essa competição requer 3 valores para os resultados"
        );
      }
    } else {
      if (value_2 || value_3) {
        throw new ParamsError(
          "Nessa competição, só se pode cadastrar 1 valor para os resultados"
        );
      }
    }
    if (!value || !unit || !competitionId || !athleteId) {
      throw new ParamsError();
    }

    if (value < 0 || value_2 < 0 || value_3 < 0) {
      throw new ParamsError("O valor do resultado deve ser um número positivo");
    }

    const isCompetitionExists = await this.resultDatabase.findCompetitionById(
      competitionId
    );

    if (!isCompetitionExists) {
      throw new NotFoundError("Competição não encontrada");
    }

    const isCompetitionClosed =
      await this.resultDatabase.findCompetitionByStatus(competitionId);

    if (isCompetitionClosed) {
      throw new ConflictError("Competição encerrada");
    }

    const isAthleteExists = await this.resultDatabase.findAthleteById(
      athleteId
    );

    if (!isAthleteExists) {
      throw new NotFoundError("Atleta não encontrado");
    }

    const id = this.idGenerator.generate();

    const result = new Result(
      id,
      value,
      value_2,
      value_3,
      unit,
      competitionId,
      athleteId
    );

    await this.resultDatabase.createResult(result);
    const response = {
      message: "Resultado cadastrado com sucesso",
    };
    return response;
  };

  public getResults = async (id: string) => {
    const isCompetitionExists = await this.resultDatabase.findCompetitionById(
      id
    );

    if (!isCompetitionExists) {
      throw new NotFoundError("Competição não encontrada");
    }
    const isThreeAttempts = await this.resultDatabase.findCompetitionByAttempts(
      id
    );

    if (isThreeAttempts) {
      const results = await this.resultDatabase.getDartsRanking(id);
      const response = {
        ranking: results,
      };
      return response;
    } else {
      const results = await this.resultDatabase.getSwimmingRanking(id);
      const response = {
        ranking: results,
      };
      return response;
    }
  };
}
