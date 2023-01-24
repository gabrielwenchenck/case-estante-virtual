"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class ResultDatabase extends BaseDatabase_1.BaseDatabase {
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
            const result = await BaseDatabase_1.BaseDatabase.connection(ResultDatabase.TABLE_COMPETITION)
                .select()
                .where({ id });
            return result[0];
        };
        this.findCompetitionByStatus = async (id) => {
            const result = await BaseDatabase_1.BaseDatabase.connection(ResultDatabase.TABLE_COMPETITION)
                .select()
                .where({ id })
                .andWhere({ is_closed: true });
            return result[0];
        };
        this.findCompetitionByAttempts = async (id) => {
            const result = await BaseDatabase_1.BaseDatabase.connection(ResultDatabase.TABLE_COMPETITION)
                .select()
                .where({ id })
                .andWhere({ attempts: 3 });
            return result[0];
        };
        this.findAthleteById = async (id) => {
            const result = await BaseDatabase_1.BaseDatabase.connection(ResultDatabase.TABLE_ATHLETE)
                .select()
                .where({ id });
            return result[0];
        };
        this.createResult = async (result) => {
            const resultDB = this.toResultDBModel(result);
            await BaseDatabase_1.BaseDatabase.connection(ResultDatabase.TABLE_RESULT).insert(resultDB);
            console.log(resultDB);
        };
        this.getDartsRanking = async (id) => {
            const result = await BaseDatabase_1.BaseDatabase.connection.raw(`
    select ${ResultDatabase.TABLE_COMPETITION}.name as competition, ${ResultDatabase.TABLE_ATHLETE}.name as athlete, GREATEST(${ResultDatabase.TABLE_RESULT}.value, ${ResultDatabase.TABLE_RESULT}.value_2, ${ResultDatabase.TABLE_RESULT}.value_3) as result, (${ResultDatabase.TABLE_RESULT}.unit) as unidade from ${ResultDatabase.TABLE_RESULT}
    join ${ResultDatabase.TABLE_COMPETITION}
    ON ${ResultDatabase.TABLE_RESULT}.competition_id = ${ResultDatabase.TABLE_COMPETITION}.id
    join ${ResultDatabase.TABLE_ATHLETE}
    ON ${ResultDatabase.TABLE_RESULT}.athlete_id = ${ResultDatabase.TABLE_ATHLETE}.id
    where ${ResultDatabase.TABLE_RESULT}.competition_id = ${id}
    order by result desc;
    `);
            return result[0];
        };
        this.getSwimmingRanking = async (id) => {
            const result = await BaseDatabase_1.BaseDatabase.connection.raw(`
    select ${ResultDatabase.TABLE_COMPETITION}.name as competition, ${ResultDatabase.TABLE_ATHLETE}.name as name, (${ResultDatabase.TABLE_RESULT}.value) as result, (${ResultDatabase.TABLE_RESULT}.unit) as unidade from ${ResultDatabase.TABLE_RESULT}
    join ${ResultDatabase.TABLE_COMPETITION}
    ON ${ResultDatabase.TABLE_RESULT}.competition_id = ${ResultDatabase.TABLE_COMPETITION}.id
    join ${ResultDatabase.TABLE_ATHLETE}
    ON ${ResultDatabase.TABLE_RESULT}.athlete_id = ${ResultDatabase.TABLE_ATHLETE}.id
    where ${ResultDatabase.TABLE_RESULT}.competition_id = ${id}
    order by value asc;
    `);
            return result[0];
        };
    }
}
exports.ResultDatabase = ResultDatabase;
ResultDatabase.TABLE_RESULT = "CASE_EV_RESULT";
ResultDatabase.TABLE_COMPETITION = "CASE_EV_COMPETITION";
ResultDatabase.TABLE_ATHLETE = "CASE_EV_ATHLETE";
//# sourceMappingURL=ResultDatabase.js.map