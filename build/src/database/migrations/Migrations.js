"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResultDatabase_1 = require("./../ResultDatabase");
const AthleteDatabase_1 = require("./../AthleteDatabase");
const BaseDatabase_1 = require("../BaseDatabase");
const CompetitionDatabase_1 = require("../CompetitionDatabase");
const data_1 = require("./data");
class Migrations extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.execute = async () => {
            try {
                console.log("Creating tables...");
                await this.createTables();
                console.log("Tables created successfully.");
                console.log("Populating tables...");
                await this.insertData();
                console.log("Tables populated successfully.");
                console.log("Migrations completed.");
            }
            catch (error) {
                console.log("FAILED! Error in migrations...");
                if (error instanceof Error) {
                    console.log(error.message);
                }
            }
            finally {
                console.log("Ending connection...");
                BaseDatabase_1.BaseDatabase.connection.destroy();
                console.log("Connection closed graciously.");
            }
        };
        this.createTables = async () => {
            await BaseDatabase_1.BaseDatabase.connection.raw(`
        DROP TABLE IF EXISTS ${ResultDatabase_1.ResultDatabase.TABLE_RESULT};
        DROP TABLE IF EXISTS ${AthleteDatabase_1.AthleteDatabase.TABLE_ATHLETE};
        DROP TABLE IF EXISTS ${CompetitionDatabase_1.CompetitionDatabase.TABLE_COMPETITION};

        CREATE TABLE IF NOT EXISTS ${AthleteDatabase_1.AthleteDatabase.TABLE_ATHLETE}(
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) NOT NULL
        );
        CREATE TABLE IF NOT EXISTS ${CompetitionDatabase_1.CompetitionDatabase.TABLE_COMPETITION}(
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) not null,
            is_closed boolean not null default false,
            attempts int not null
        );
        CREATE TABLE IF NOT EXISTS ${ResultDatabase_1.ResultDatabase.TABLE_RESULT}(
            id VARCHAR(255) PRIMARY KEY,
            value FLOAT not null,
            value_2 FLOAT,
            value_3 FLOAT,
            unit VARCHAR(255) not null,
            competition_id VARCHAR(255) not null,
            athlete_id VARCHAR(255) not null,
            foreign key (competition_id) references ${ResultDatabase_1.ResultDatabase.TABLE_RESULT}(id),
            foreign key (athlete_id) references ${AthleteDatabase_1.AthleteDatabase.TABLE_ATHLETE}(id)
        );
        `);
        };
        this.insertData = async () => {
            await BaseDatabase_1.BaseDatabase.connection(AthleteDatabase_1.AthleteDatabase.TABLE_ATHLETE).insert(data_1.athletes);
            await BaseDatabase_1.BaseDatabase.connection(CompetitionDatabase_1.CompetitionDatabase.TABLE_COMPETITION).insert(data_1.competitions);
            await BaseDatabase_1.BaseDatabase.connection(ResultDatabase_1.ResultDatabase.TABLE_RESULT).insert(data_1.results);
        };
    }
}
const migrations = new Migrations();
migrations.execute();
//# sourceMappingURL=Migrations.js.map