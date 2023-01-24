"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultBusiness = void 0;
const Result_1 = require("../models/Result");
const ParamsError_1 = require("../errors/ParamsError");
const NotFoundError_1 = require("../errors/NotFoundError");
const ConflictError_1 = require("../errors/ConflictError");
class ResultBusiness {
    constructor(resultDatabase, idGenerator) {
        this.resultDatabase = resultDatabase;
        this.idGenerator = idGenerator;
        this.create = async (input) => {
            const { value, value_2, value_3, unit, competitionId, athleteId } = input;
            const isThreeAttempts = await this.resultDatabase.findCompetitionByAttempts(competitionId);
            if (isThreeAttempts) {
                if (!value || !value_2 || !value_3) {
                    throw new ParamsError_1.ParamsError("Essa competição requer 3 valores para os resultados");
                }
            }
            else {
                if (value_2 || value_3) {
                    throw new ParamsError_1.ParamsError("Nessa competição, só se pode cadastrar 1 valor para os resultados");
                }
            }
            if (!value || !unit || !competitionId || !athleteId) {
                throw new ParamsError_1.ParamsError();
            }
            if (value < 0 || value_2 < 0 || value_3 < 0) {
                throw new ParamsError_1.ParamsError("O valor do resultado deve ser um número positivo");
            }
            const isCompetitionExists = await this.resultDatabase.findCompetitionById(competitionId);
            if (!isCompetitionExists) {
                throw new NotFoundError_1.NotFoundError("Competição não encontrada");
            }
            const isCompetitionClosed = await this.resultDatabase.findCompetitionByStatus(competitionId);
            if (isCompetitionClosed) {
                throw new ConflictError_1.ConflictError("Competição encerrada");
            }
            const isAthleteExists = await this.resultDatabase.findAthleteById(athleteId);
            if (!isAthleteExists) {
                throw new NotFoundError_1.NotFoundError("Atleta não encontrado");
            }
            const id = this.idGenerator.generate();
            const result = new Result_1.Result(id, value, value_2, value_3, unit, competitionId, athleteId);
            await this.resultDatabase.createResult(result);
            const response = {
                message: "Resultado cadastrado com sucesso",
            };
            return response;
        };
        this.getResults = async (id) => {
            const isCompetitionExists = await this.resultDatabase.findCompetitionById(id);
            if (!isCompetitionExists) {
                throw new NotFoundError_1.NotFoundError("Competição não encontrada");
            }
            const isThreeAttempts = await this.resultDatabase.findCompetitionByAttempts(id);
            if (isThreeAttempts) {
                const results = await this.resultDatabase.getDartsRanking(id);
                const response = {
                    ranking: results,
                };
                return response;
            }
            else {
                const results = await this.resultDatabase.getSwimmingRanking(id);
                const response = {
                    ranking: results,
                };
                return response;
            }
        };
    }
}
exports.ResultBusiness = ResultBusiness;
//# sourceMappingURL=ResultBusiness.js.map