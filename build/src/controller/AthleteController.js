"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AthleteController = void 0;
class AthleteController {
    constructor(athleteBusiness) {
        this.athleteBusiness = athleteBusiness;
        this.create = async (req, res) => {
            try {
                const name = req.body.name;
                const response = await this.athleteBusiness.create(name);
                res.status(201).send(response);
            }
            catch (error) {
                res.status(500).send({ message: error.message });
            }
        };
    }
}
exports.AthleteController = AthleteController;
//# sourceMappingURL=AthleteController.js.map