"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.athleteRouter = void 0;
const express_1 = require("express");
const IdGenerator_1 = require("../services/IdGenerator");
const AthleteController_1 = require("../controller/AthleteController");
const AthleteBusiness_1 = require("../business/AthleteBusiness");
const AthleteDatabase_1 = require("../database/AthleteDatabase");
exports.athleteRouter = (0, express_1.Router)();
const athleteController = new AthleteController_1.AthleteController(new AthleteBusiness_1.AthleteBusiness(new AthleteDatabase_1.AthleteDatabase(), new IdGenerator_1.IdGenerator()));
exports.athleteRouter.post("/create", athleteController.create);
//# sourceMappingURL=athleteRouter.js.map