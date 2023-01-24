import { ResultDatabase } from "./../ResultDatabase";
import { AthleteDatabase } from "./../AthleteDatabase";
import { BaseDatabase } from "../BaseDatabase";
import { CompetitionDatabase } from "../CompetitionDatabase";
import { athletes, competitions, results } from "./data";

class Migrations extends BaseDatabase {
  execute = async () => {
    try {
      console.log("Creating tables...");
      await this.createTables();
      console.log("Tables created successfully.");

      console.log("Populating tables...");
      await this.insertData();
      console.log("Tables populated successfully.");

      console.log("Migrations completed.");
    } catch (error) {
      console.log("FAILED! Error in migrations...");
      if (error instanceof Error) {
        console.log(error.message);
      }
    } finally {
      console.log("Ending connection...");
      BaseDatabase.connection.destroy();
      console.log("Connection closed graciously.");
    }
  };

  createTables = async () => {
    await BaseDatabase.connection.raw(`
        DROP TABLE IF EXISTS ${ResultDatabase.TABLE_RESULT};
        DROP TABLE IF EXISTS ${AthleteDatabase.TABLE_ATHLETE};
        DROP TABLE IF EXISTS ${CompetitionDatabase.TABLE_COMPETITION};

        CREATE TABLE IF NOT EXISTS ${AthleteDatabase.TABLE_ATHLETE}(
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) NOT NULL
        );
        CREATE TABLE IF NOT EXISTS ${CompetitionDatabase.TABLE_COMPETITION}(
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) not null,
            is_closed boolean not null default false,
            attempts int not null
        );
        CREATE TABLE IF NOT EXISTS ${ResultDatabase.TABLE_RESULT}(
            id VARCHAR(255) PRIMARY KEY,
            value FLOAT not null,
            value_2 FLOAT,
            value_3 FLOAT,
            unit VARCHAR(255) not null,
            competition_id VARCHAR(255) not null,
            athlete_id VARCHAR(255) not null,
            foreign key (competition_id) references ${ResultDatabase.TABLE_RESULT}(id),
            foreign key (athlete_id) references ${AthleteDatabase.TABLE_ATHLETE}(id)
        );
        `);
  };

  insertData = async () => {
    await BaseDatabase.connection(AthleteDatabase.TABLE_ATHLETE).insert(
      athletes
    );
    await BaseDatabase.connection(CompetitionDatabase.TABLE_COMPETITION).insert(
      competitions
    );
    await BaseDatabase.connection(ResultDatabase.TABLE_RESULT).insert(results);
  };
}

const migrations = new Migrations();
migrations.execute();
