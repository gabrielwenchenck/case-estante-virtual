"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AthleteBusiness = void 0;
const Athlete_1 = require("./../models/Athlete");
const ParamsError_1 = require("../errors/ParamsError");
class AthleteBusiness {
    constructor(athleteDatabase, idGenerator) {
        this.athleteDatabase = athleteDatabase;
        this.idGenerator = idGenerator;
        this.create = async (name) => {
            if (!name) {
                throw new ParamsError_1.ParamsError();
            }
            if (typeof name !== "string") {
                throw new ParamsError_1.ParamsError("Parâmetro 'name' inválido: deve ser uma string");
            }
            const id = this.idGenerator.generate();
            const athlete = new Athlete_1.Athlete(id, name);
            await this.athleteDatabase.createAthlete(athlete);
            const response = {
                message: "Atleta cadastrado com sucesso",
            };
            return response;
        };
    }
}
exports.AthleteBusiness = AthleteBusiness;
//# sourceMappingURL=AthleteBusiness.js.map