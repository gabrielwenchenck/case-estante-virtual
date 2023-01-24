"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const pingRouter_1 = require("./router/pingRouter");
const competitionRouter_1 = require("./router/competitionRouter");
const athleteRouter_1 = require("./router/athleteRouter");
const resultRouter_1 = require("./router/resultRouter");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(process.env.PORT || 3003, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT || 3003}`);
});
app.use("/ping", pingRouter_1.pingRouter);
app.use("/competition", competitionRouter_1.competitionRouter);
app.use("/athlete", athleteRouter_1.athleteRouter);
app.use("/result", resultRouter_1.resultRouter);
//# sourceMappingURL=index.js.map