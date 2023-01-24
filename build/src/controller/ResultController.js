"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultController = void 0;
class ResultController {
    constructor(resultBusiness) {
        this.resultBusiness = resultBusiness;
        this.create = async (req, res) => {
            try {
                const input = {
                    value: req.body.value,
                    value_2: req.body.value_2,
                    value_3: req.body.value_3,
                    unit: req.body.unit,
                    competitionId: req.body.competitionId,
                    athleteId: req.body.athleteId,
                };
                const response = await this.resultBusiness.create(input);
                res.status(201).send(response);
            }
            catch (error) {
                res.status(500).send({ message: error.message });
            }
        };
        this.getResults = async (req, res) => {
            try {
                const id = req.params.id;
                const response = await this.resultBusiness.getResults(id);
                res.status(201).send(response);
            }
            catch (error) {
                res.status(500).send({ message: error.message });
            }
        };
    }
}
exports.ResultController = ResultController;
//# sourceMappingURL=ResultController.js.map