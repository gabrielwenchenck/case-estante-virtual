import { Competition, ICompetitionDB } from "./../../src/models/Competition";
import { BaseDatabase } from "./../../src/database/BaseDatabase";

export class CompetitionDatabaseMock extends BaseDatabase {
  public static TABLE_COMPETITION = "CASE_EV_COMPETITION";

  public toCompetitionDBModel = (competition: Competition): ICompetitionDB => {
    const competitionDB: ICompetitionDB = {
      id: competition.getId(),
      name: competition.getName(),
      attempts: competition.getAttempts(),
      is_closed: competition.getIsClosed()!,
    };

    return competitionDB;
  };
  public findById = async (id: string): Promise<ICompetitionDB | undefined> => {
    switch (id) {
      case "id-mock":
        return {
          id: "id-mock",
          name: "competition-mock",
          is_closed: false,
          attempts: 3,
        };
      default:
        undefined;
    }
  };

  public findByName = async (
    name: string
  ): Promise<ICompetitionDB | undefined> => {
    switch (name) {
      case "competition-mock":
        return {
          id: "id-mock",
          name: "competition-mock",
          is_closed: false,
          attempts: 3,
        };
      default:
        undefined;
    }
  };

  public createCompetition = async (
    competition: Competition
  ): Promise<void> => {};

  public closeCompetition = async (id: string): Promise<void> => {};
}
