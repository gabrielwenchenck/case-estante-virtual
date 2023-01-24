"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompetitionDatabaseMock = void 0;
const BaseDatabase_1 = require("./../../src/database/BaseDatabase");
class CompetitionDatabaseMock extends BaseDatabase_1.BaseDatabase {
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
        this.findByName = async (name) => {
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
        this.createCompetition = async (competition) => { };
        this.closeCompetition = async (id) => { };
    }
}
exports.CompetitionDatabaseMock = CompetitionDatabaseMock;
CompetitionDatabaseMock.TABLE_COMPETITION = "CASE_EV_COMPETITION";
//# sourceMappingURL=CompetitionDatabaseMock.js.map