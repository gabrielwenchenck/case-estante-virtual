"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CompetitionBusiness_1 = require("../../src/business/CompetitionBusiness");
const BaseError_1 = require("../../src/errors/BaseError");
const CompetitionDatabaseMock_1 = require("../mocks/CompetitionDatabaseMock");
const IdGeneratorMock_1 = require("../mocks/IdGeneratorMock");
describe("Testanto close da CompetitionBusiness", () => {
    const competitionBusiness = new CompetitionBusiness_1.CompetitionBusiness(new CompetitionDatabaseMock_1.CompetitionDatabaseMock(), new IdGeneratorMock_1.IdGeneratorMock());
    test("Caso de sucesso", async () => {
        const id = "id-mock";
        const result = await competitionBusiness.close(id);
        expect(result.message).toEqual("Competição finalizada com sucesso");
    });
    test("Caso de erro, quando não é passado o id", async () => {
        expect.assertions(2);
        try {
            const id = "";
            await competitionBusiness.close(id);
        }
        catch (error) {
            if (error instanceof BaseError_1.BaseError) {
                expect(error.message).toEqual("Deve ser passado o id competição");
                expect(error.statusCode).toEqual(400);
            }
        }
    });
    test("Caso de erro, competição inexistente", async () => {
        expect.assertions(2);
        try {
            const id = "undefined-id-mock";
            await competitionBusiness.close(id);
        }
        catch (error) {
            if (error instanceof BaseError_1.BaseError) {
                expect(error.message).toEqual("Competição não encontrada");
                expect(error.statusCode).toEqual(404);
            }
        }
    });
});
//# sourceMappingURL=close.test.js.map