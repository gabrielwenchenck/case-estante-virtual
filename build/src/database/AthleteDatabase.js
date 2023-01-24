"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AthleteDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class AthleteDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.toAthleteDBModel = (athlete) => {
            const athleteDB = {
                id: athlete.getId(),
                name: athlete.getName(),
            };
            return athleteDB;
        };
        this.createAthlete = async (athlete) => {
            const athleteDB = this.toAthleteDBModel(athlete);
            await BaseDatabase_1.BaseDatabase.connection(AthleteDatabase.TABLE_ATHLETE).insert(athleteDB);
            console.log(athleteDB);
        };
    }
}
exports.AthleteDatabase = AthleteDatabase;
AthleteDatabase.TABLE_ATHLETE = "CASE_EV_ATHLETE";
//# sourceMappingURL=AthleteDatabase.js.map