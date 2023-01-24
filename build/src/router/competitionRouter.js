"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.competitionRouter = void 0;
const CompetitionController_1 = require("./../controller/CompetitionController");
const express_1 = require("express");
const IdGenerator_1 = require("../services/IdGenerator");
const CompetitionDatabase_1 = require("../database/CompetitionDatabase");
const CompetitionBusiness_1 = require("../business/CompetitionBusiness");
exports.competitionRouter = (0, express_1.Router)();
const competitionController = new CompetitionController_1.CompetitionController(new CompetitionBusiness_1.CompetitionBusiness(new CompetitionDatabase_1.CompetitionDatabase(), new IdGenerator_1.IdGenerator()));
exports.competitionRouter.post("/create", competitionController.create);
exports.competitionRouter.post("/close/:id", competitionController.close);
//# sourceMappingURL=competitionRouter.js.map