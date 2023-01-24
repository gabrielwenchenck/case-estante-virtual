"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resultRouter = void 0;
const express_1 = require("express");
const IdGenerator_1 = require("../services/IdGenerator");
const ResultController_1 = require("../controller/ResultController");
const ResultBusiness_1 = require("../business/ResultBusiness");
const ResultDatabase_1 = require("../database/ResultDatabase");
exports.resultRouter = (0, express_1.Router)();
const resultController = new ResultController_1.ResultController(new ResultBusiness_1.ResultBusiness(new ResultDatabase_1.ResultDatabase(), new IdGenerator_1.IdGenerator()));
exports.resultRouter.post("/create", resultController.create);
exports.resultRouter.get("/ranking/:id", resultController.getResults);
//# sourceMappingURL=resultRouter.js.map