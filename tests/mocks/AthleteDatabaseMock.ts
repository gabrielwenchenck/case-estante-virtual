import { Athlete, IAthleteDB } from "./../../src/models/Athlete";
import { BaseDatabase } from "./../../src/database/BaseDatabase";

export class AthleteDatabaseMock extends BaseDatabase {
  public static TABLE_ATHLETE = "CASE_EV_ATHLETE";

  public toAthleteDBModel = (athlete: Athlete): IAthleteDB => {
    const athleteDB: IAthleteDB = {
      id: athlete.getId(),
      name: athlete.getName(),
    };

    return athleteDB;
  };

  public createAthlete = async (athlete: Athlete): Promise<void> => {};
}
