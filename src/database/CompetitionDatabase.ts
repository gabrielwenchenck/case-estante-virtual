import { Competition, ICompetitionDB } from "../models/Competition";
import { BaseDatabase } from "./BaseDatabase";

export class CompetitionDatabase extends BaseDatabase {
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
    const result: ICompetitionDB[] = await BaseDatabase.connection(
      CompetitionDatabase.TABLE_COMPETITION
    )
      .select()
      .where({ id });
    return result[0];
  };

  public findByName = async (
    name: string
  ): Promise<ICompetitionDB | undefined> => {
    const result: ICompetitionDB[] = await BaseDatabase.connection(
      CompetitionDatabase.TABLE_COMPETITION
    )
      .select()
      .where({ name });

    return result[0];
  };

  public createCompetition = async (
    competition: Competition
  ): Promise<void> => {
    const competitionDB = this.toCompetitionDBModel(competition);

    await BaseDatabase.connection(CompetitionDatabase.TABLE_COMPETITION).insert(
      competitionDB
    );
  };

  public closeCompetition = async (id: string): Promise<void> => {
    await BaseDatabase.connection(CompetitionDatabase.TABLE_COMPETITION)
      .update({ is_closed: true })
      .where({ id });
  };
}
