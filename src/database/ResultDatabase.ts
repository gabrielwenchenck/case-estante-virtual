import { IGetDartRankingDTO, IResultDB, Result } from "./../models/Result";
import { IAthleteDB } from "../models/Athlete";
import { ICompetitionDB } from "../models/Competition";
import { BaseDatabase } from "./BaseDatabase";

export class ResultDatabase extends BaseDatabase {
  public static TABLE_RESULT = "CASE_EV_RESULT";
  public static TABLE_COMPETITION = "CASE_EV_COMPETITION";
  public static TABLE_ATHLETE = "CASE_EV_ATHLETE";

  public toResultDBModel = (result: Result): IResultDB => {
    const resultDB: IResultDB = {
      id: result.getId(),
      value: result.getValue(),
      value_2: result.getValue2(),
      value_3: result.getValue3(),
      unit: result.getUnit(),
      competition_id: result.getCompetitionId(),
      athlete_id: result.getAthleteId(),
    };

    return resultDB;
  };

  public findCompetitionById = async (
    id: string
  ): Promise<ICompetitionDB | undefined> => {
    const result: ICompetitionDB[] = await BaseDatabase.connection(
      ResultDatabase.TABLE_COMPETITION
    )
      .select()
      .where({ id });
    return result[0];
  };

  public findCompetitionByStatus = async (
    id: string
  ): Promise<ICompetitionDB | undefined> => {
    const result: ICompetitionDB[] = await BaseDatabase.connection(
      ResultDatabase.TABLE_COMPETITION
    )
      .select()
      .where({ id })
      .andWhere({ is_closed: true });
    return result[0];
  };

  public findCompetitionByAttempts = async (
    id: string
  ): Promise<ICompetitionDB | undefined> => {
    const result: ICompetitionDB[] = await BaseDatabase.connection(
      ResultDatabase.TABLE_COMPETITION
    )
      .select()
      .where({ id })
      .andWhere({ attempts: 3 });
    return result[0];
  };

  public findAthleteById = async (
    id: string
  ): Promise<IAthleteDB | undefined> => {
    const result: IAthleteDB[] = await BaseDatabase.connection(
      ResultDatabase.TABLE_ATHLETE
    )
      .select()
      .where({ id });
    return result[0];
  };

  public createResult = async (result: Result): Promise<void> => {
    const resultDB = this.toResultDBModel(result);

    await BaseDatabase.connection(ResultDatabase.TABLE_RESULT).insert(resultDB);
  };

  public getDartsRanking = async (
    id: string
  ): Promise<IGetDartRankingDTO | undefined> => {
    const result: IGetDartRankingDTO[] = await BaseDatabase.connection.raw(`
    select ${ResultDatabase.TABLE_COMPETITION}.name as competition, ${ResultDatabase.TABLE_ATHLETE}.name as athlete, GREATEST(${ResultDatabase.TABLE_RESULT}.value, ${ResultDatabase.TABLE_RESULT}.value_2, ${ResultDatabase.TABLE_RESULT}.value_3) as result, (${ResultDatabase.TABLE_RESULT}.unit) as unidade from ${ResultDatabase.TABLE_RESULT}
    join ${ResultDatabase.TABLE_COMPETITION}
    ON ${ResultDatabase.TABLE_RESULT}.competition_id = ${ResultDatabase.TABLE_COMPETITION}.id
    join ${ResultDatabase.TABLE_ATHLETE}
    ON ${ResultDatabase.TABLE_RESULT}.athlete_id = ${ResultDatabase.TABLE_ATHLETE}.id
    where ${ResultDatabase.TABLE_RESULT}.competition_id = ${id}
    order by result desc;
    `);
    return result[0];
  };
  public getSwimmingRanking = async (
    id: string
  ): Promise<IGetDartRankingDTO | undefined> => {
    const result: IGetDartRankingDTO[] = await BaseDatabase.connection.raw(`
    select ${ResultDatabase.TABLE_COMPETITION}.name as competition, ${ResultDatabase.TABLE_ATHLETE}.name as name, (${ResultDatabase.TABLE_RESULT}.value) as result, (${ResultDatabase.TABLE_RESULT}.unit) as unidade from ${ResultDatabase.TABLE_RESULT}
    join ${ResultDatabase.TABLE_COMPETITION}
    ON ${ResultDatabase.TABLE_RESULT}.competition_id = ${ResultDatabase.TABLE_COMPETITION}.id
    join ${ResultDatabase.TABLE_ATHLETE}
    ON ${ResultDatabase.TABLE_RESULT}.athlete_id = ${ResultDatabase.TABLE_ATHLETE}.id
    where ${ResultDatabase.TABLE_RESULT}.competition_id = ${id}
    order by value asc;
    `);
    return result[0];
  };
}
