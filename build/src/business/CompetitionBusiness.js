"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompetitionBusiness = void 0;
const Competition_1 = require("../models/Competition");
const ParamsError_1 = require("../errors/ParamsError");
const ConflictError_1 = require("../errors/ConflictError");
const NotFoundError_1 = require("../errors/NotFoundError");
class CompetitionBusiness {
    constructor(competitionDatabase, idGenerator) {
        this.competitionDatabase = competitionDatabase;
        this.idGenerator = idGenerator;
        this.create = async (name, attempts) => {
            if (!name || !attempts) {
                throw new ParamsError_1.ParamsError("Deve ser passado o nome e a quantidade de chances da competição");
            }
            if (typeof name !== "string") {
                throw new ParamsError_1.ParamsError("Parâmetro 'name' inválido: deve ser uma string");
            }
            if (typeof attempts !== "number") {
                throw new ParamsError_1.ParamsError("Parâmetro 'attempts' inválido: deve ser um number");
            }
            const isCompetitionAlreadyExists = await this.competitionDatabase.findByName(name);
            if (isCompetitionAlreadyExists) {
                throw new ConflictError_1.ConflictError("Competição já cadastrada");
            }
            const id = this.idGenerator.generate();
            const competition = new Competition_1.Competition(id, name, attempts);
            await this.competitionDatabase.createCompetition(competition);
            const response = {
                message: "Competição criada com sucesso",
            };
            return response;
        };
        this.close = async (id) => {
            if (!id) {
                throw new ParamsError_1.ParamsError("Deve ser passado o id competição");
            }
            const isCompetitionExists = await this.competitionDatabase.findById(id);
            if (!isCompetitionExists) {
                throw new NotFoundError_1.NotFoundError("Competição não encontrada");
            }
            await this.competitionDatabase.closeCompetition(id);
            const response = {
                message: "Competição finalizada com sucesso",
            };
            return response;
        };
    }
}
exports.CompetitionBusiness = CompetitionBusiness;
//# sourceMappingURL=CompetitionBusiness.js.map