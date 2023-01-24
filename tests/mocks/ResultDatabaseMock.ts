import {
  IGetDartRankingDTO,
  IResultDB,
  Result,
} from "./../../src/models/Result";
import { BaseDatabase } from "../../src/database/BaseDatabase";
import { ICompetitionDB } from "../../src/models/Competition";
import { IAthleteDB } from "../../src/models/Athlete";

export class ResultDatabaseMock extends BaseDatabase {
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
    switch (id) {
      case "id-mock-dart":
        return {
          id: "id-mock-dart",
          name: "competition-mock",
          is_closed: false,
          attempts: 3,
        };
      case "id-mock-swimming":
        return {
          id: "id-mock-swimming",
          name: "competition-mock",
          is_closed: false,
          attempts: 3,
        };
      case "id-mock-closed":
        return {
          id: "id-mock-closed",
          name: "competition-mock",
          is_closed: true,
          attempts: 3,
        };
      default:
        undefined;
    }
  };

  public findCompetitionByStatus = async (
    id: string
  ): Promise<ICompetitionDB | undefined> => {
    switch (id) {
      case "id-mock-closed":
        return {
          id: "id-mock-closed",
          name: "competition-mock",
          is_closed: true,
          attempts: 1,
        };

      default:
        undefined;
    }
  };

  public findCompetitionByAttempts = async (
    id: string
  ): Promise<ICompetitionDB | undefined> => {
    switch (id) {
      case "id-mock-dart":
        return {
          id: "id-mock-dart",
          name: "competition-mock",
          is_closed: false,
          attempts: 3,
        };
      default:
        undefined;
    }
  };

  public findAthleteById = async (
    id: string
  ): Promise<IAthleteDB | undefined> => {
    switch (id) {
      case "athlete-id-mock":
        return {
          id: "athlete-id-mock",
          name: "athlete-mock",
        };
      default:
        undefined;
    }
  };

  public createResult = async (result: Result): Promise<void> => {};

  public getDartsRanking = async (
    id: string
  ): Promise<IGetDartRankingDTO | undefined> => {
    switch (id) {
      case "id-mock-dart":
        return {
          competition: "competition-mock",
          athlete: "athlete-mock",
          result: 20,
          unit: "unit-mock",
        };
      default:
        undefined;
    }
  };
  public getSwimmingRanking = async (
    id: string
  ): Promise<IGetDartRankingDTO | undefined> => {
    switch (id) {
      case "id-mock-swimming":
        return {
          competition: "competition-mock",
          athlete: "athlete-mock",
          result: 20,
          unit: "unit-mock",
        };
      default:
        undefined;
    }
  };
}
