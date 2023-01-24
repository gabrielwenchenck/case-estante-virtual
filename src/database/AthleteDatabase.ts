import { Athlete, IAthleteDB } from "../models/Athlete";
import { BaseDatabase } from "./BaseDatabase";

export class AthleteDatabase extends BaseDatabase {
  public static TABLE_ATHLETE = "CASE_EV_ATHLETE";

  public toAthleteDBModel = (athlete: Athlete): IAthleteDB => {
    const athleteDB: IAthleteDB = {
      id: athlete.getId(),
      name: athlete.getName(),
    };

    return athleteDB;
  };

  public createAthlete = async (athlete: Athlete): Promise<void> => {
    const athleteDB = this.toAthleteDBModel(athlete);

    await BaseDatabase.connection(AthleteDatabase.TABLE_ATHLETE).insert(
      athleteDB
    );
    console.log(athleteDB);
  };
}
