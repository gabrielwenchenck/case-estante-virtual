"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
class Result {
    constructor(id, value, value_2, value_3, unit, competitionId, athleteId) {
        this.id = id;
        this.value = value;
        this.value_2 = value_2;
        this.value_3 = value_3;
        this.unit = unit;
        this.competitionId = competitionId;
        this.athleteId = athleteId;
        this.getId = () => {
            return this.id;
        };
        this.getValue = () => {
            return this.value;
        };
        this.getValue2 = () => {
            return this.value_2;
        };
        this.getValue3 = () => {
            return this.value_3;
        };
        this.getUnit = () => {
            return this.unit;
        };
        this.getCompetitionId = () => {
            return this.competitionId;
        };
        this.getAthleteId = () => {
            return this.athleteId;
        };
        this.setId = (newId) => {
            this.id = newId;
        };
        this.setValue = (newValue) => {
            this.value = newValue;
        };
        this.setUnit = (newUnit) => {
            this.unit = newUnit;
        };
        this.setCompetitionId = (newCompetitionId) => {
            this.competitionId = newCompetitionId;
        };
        this.setAthleteId = (newAthleteId) => {
            this.athleteId = newAthleteId;
        };
        this.setValue2 = (newValue2) => {
            this.value_2 = newValue2;
        };
        this.setValue3 = (newValue3) => {
            this.value_3 = newValue3;
        };
    }
}
exports.Result = Result;
//# sourceMappingURL=Result.js.map