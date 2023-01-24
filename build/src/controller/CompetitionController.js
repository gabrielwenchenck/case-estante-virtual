"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompetitionController = void 0;
class CompetitionController {
    constructor(competitionBusiness) {
        this.competitionBusiness = competitionBusiness;
        this.create = async (req, res) => {
            try {
                const name = req.body.name;
                const attempts = req.body.attempts;
                const response = await this.competitionBusiness.create(name, attempts);
                res.status(201).send(response);
            }
            catch (error) {
                res.status(500).send({ message: error.message });
            }
        };
        this.close = async (req, res) => {
            try {
                const id = req.params.id;
                const response = await this.competitionBusiness.close(id);
                res.status(201).send(response);
            }
            catch (error) {
                res.status(500).send({ message: error.message });
            }
        };
    }
}
exports.CompetitionController = CompetitionController;
//# sourceMappingURL=CompetitionController.js.map