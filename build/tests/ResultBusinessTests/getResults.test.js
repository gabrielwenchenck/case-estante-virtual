"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResultBusiness_1 = require("../../src/business/ResultBusiness");
const BaseError_1 = require("../../src/errors/BaseError");
const IdGeneratorMock_1 = require("../mocks/IdGeneratorMock");
const ResultDatabaseMock_1 = require("../mocks/ResultDatabaseMock");
describe("Testanto getResults da ResultBusiness", () => {
    const resultBusiness = new ResultBusiness_1.ResultBusiness(new ResultDatabaseMock_1.ResultDatabaseMock(), new IdGeneratorMock_1.IdGeneratorMock());
    test("Caso de sucesso do ranking da competição de dardos", async () => {
        const id = "id-mock-dart";
        const result = await resultBusiness.getResults(id);
        expect(result.ranking).toEqual({
            competition: "competition-mock",
            athlete: "athlete-mock",
            result: 20,
            unit: "unit-mock",
        });
    });
    test("Caso de sucesso do ranking da competição de natação", async () => {
        const id = "id-mock-swimming";
        const result = await resultBusiness.getResults(id);
        expect(result.ranking).toEqual({
            competition: "competition-mock",
            athlete: "athlete-mock",
            result: 20,
            unit: "unit-mock",
        });
    });
    test("Caso de erro, competição inexistente", async () => {
        expect.assertions(2);
        try {
            const id = "undefined-competition-id";
            await resultBusiness.getResults(id);
        }
        catch (error) {
            if (error instanceof BaseError_1.BaseError) {
                expect(error.message).toEqual("Competição não encontrada");
                expect(error.statusCode).toEqual(404);
            }
        }
    });
});
//# sourceMappingURL=getResults.test.js.map