"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompetitionDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class CompetitionDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.toCompetitionDBModel = (competition) => {
            const competitionDB = {
                id: competition.getId(),
                name: competition.getName(),
                attempts: competition.getAttempts(),
                is_closed: competition.getIsClosed(),
            };
            return competitionDB;
        };
        this.findById = async (id) => {
            const result = await BaseDatabase_1.BaseDatabase.connection(CompetitionDatabase.TABLE_COMPETITION)
                .select()
                .where({ id });
            return result[0];
        };
        this.findByName = async (name) => {
            const result = await BaseDatabase_1.BaseDatabase.connection(CompetitionDatabase.TABLE_COMPETITION)
                .select()
                .where({ name });
            return result[0];
        };
        this.createCompetition = async (competition) => {
            const competitionDB = this.toCompetitionDBModel(competition);
            await BaseDatabase_1.BaseDatabase.connection(CompetitionDatabase.TABLE_COMPETITION).insert(competitionDB);
        };
        this.closeCompetition = async (id) => {
            await BaseDatabase_1.BaseDatabase.connection(CompetitionDatabase.TABLE_COMPETITION)
                .update({ is_closed: true })
                .where({ id });
        };
    }
}
exports.CompetitionDatabase = CompetitionDatabase;
CompetitionDatabase.TABLE_COMPETITION = "CASE_EV_COMPETITION";
//# sourceMappingURL=CompetitionDatabase.js.map