"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AthleteDatabaseMock = void 0;
const BaseDatabase_1 = require("./../../src/database/BaseDatabase");
class AthleteDatabaseMock extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.toAthleteDBModel = (athlete) => {
            const athleteDB = {
                id: athlete.getId(),
                name: athlete.getName(),
            };
            return athleteDB;
        };
        this.createAthlete = async (athlete) => { };
    }
}
exports.AthleteDatabaseMock = AthleteDatabaseMock;
AthleteDatabaseMock.TABLE_ATHLETE = "CASE_EV_ATHLETE";
//# sourceMappingURL=AthleteDatabaseMock.js.map