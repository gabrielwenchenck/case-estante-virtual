"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultDatabaseMock = void 0;
const BaseDatabase_1 = require("../../src/database/BaseDatabase");
class ResultDatabaseMock extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.toResultDBModel = (result) => {
            const resultDB = {
                id: result.getId(),
                value: result.getValue(),
                value_2: result.getValue2(),
                value_3: result.getValue3(),
                unit: result.getUnit(),
                competition_id: result.getCompetitionId(),
                athlete_id: result.getAthleteId(),
            };
            return resultDB;
        };
        this.findCompetitionById = async (id) => {
            switch (id) {
                case "id-mock-dart":
                    return {
                        id: "id-mock-dart",
                        name: "competition-mock",
                        is_closed: false,
                        attempts: 3,
                    };
                case "id-mock-swimming":
                    return {
                        id: "id-mock-swimming",
                        name: "competition-mock",
                        is_closed: false,
                        attempts: 3,
                    };
                case "id-mock-closed":
                    return {
                        id: "id-mock-closed",
                        name: "competition-mock",
                        is_closed: true,
                        attempts: 3,
                    };
                default:
                    undefined;
            }
        };
        this.findCompetitionByStatus = async (id) => {
            switch (id) {
                case "id-mock-closed":
                    return {
                        id: "id-mock-closed",
                        name: "competition-mock",
                        is_closed: true,
                        attempts: 1,
                    };
                default:
                    undefined;
            }
        };
        this.findCompetitionByAttempts = async (id) => {
            switch (id) {
                case "id-mock-dart":
                    return {
                        id: "id-mock-dart",
                        name: "competition-mock",
                        is_closed: false,
                        attempts: 3,
                    };
                default:
                    undefined;
            }
        };
        this.findAthleteById = async (id) => {
            switch (id) {
                case "athlete-id-mock":
                    return {
                        id: "athlete-id-mock",
                        name: "athlete-mock",
                    };
                default:
                    undefined;
            }
        };
        this.createResult = async (result) => { };
        this.getDartsRanking = async (id) => {
            switch (id) {
                case "id-mock-dart":
                    return {
                        competition: "competition-mock",
                        athlete: "athlete-mock",
                        result: 20,
                        unit: "unit-mock",
                    };
                default:
                    undefined;
            }
        };
        this.getSwimmingRanking = async (id) => {
            switch (id) {
                case "id-mock-swimming":
                    return {
                        competition: "competition-mock",
                        athlete: "athlete-mock",
                        result: 20,
                        unit: "unit-mock",
                    };
                default:
                    undefined;
            }
        };
    }
}
exports.ResultDatabaseMock = ResultDatabaseMock;
ResultDatabaseMock.TABLE_RESULT = "CASE_EV_RESULT";
ResultDatabaseMock.TABLE_COMPETITION = "CASE_EV_COMPETITION";
ResultDatabaseMock.TABLE_ATHLETE = "CASE_EV_ATHLETE";
//# sourceMappingURL=ResultDatabaseMock.js.map