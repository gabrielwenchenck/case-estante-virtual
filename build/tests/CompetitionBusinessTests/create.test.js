"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CompetitionDatabaseMock_1 = require("./../mocks/CompetitionDatabaseMock");
const CompetitionBusiness_1 = require("./../../src/business/CompetitionBusiness");
const IdGeneratorMock_1 = require("./../mocks/IdGeneratorMock");
const BaseError_1 = require("../../src/errors/BaseError");
describe("Testanto create da CompetitionBusiness", () => {
    const competitionBusiness = new CompetitionBusiness_1.CompetitionBusiness(new CompetitionDatabaseMock_1.CompetitionDatabaseMock(), new IdGeneratorMock_1.IdGeneratorMock());
    test("Caso de sucesso", async () => {
        const name = "athlete-mock";
        const attempts = 3;
        const result = await competitionBusiness.create(name, attempts);
        expect(result.message).toEqual("Competição criada com sucesso");
    });
    test("Caso de erro, criando uma competição sem nome", async () => {
        expect.assertions(2);
        try {
            const name = "";
            const attempts = 1;
            await competitionBusiness.create(name, attempts);
        }
        catch (error) {
            if (error instanceof BaseError_1.BaseError) {
                expect(error.message).toEqual("Deve ser passado o nome e a quantidade de chances da competição");
                expect(error.statusCode).toEqual(400);
            }
        }
    });
    test("Caso de erro, criando uma competição sem chances", async () => {
        expect.assertions(2);
        try {
            const name = "competition-mock";
            const attempts = 0;
            await competitionBusiness.create(name, attempts);
        }
        catch (error) {
            if (error instanceof BaseError_1.BaseError) {
                expect(error.message).toEqual("Deve ser passado o nome e a quantidade de chances da competição");
                expect(error.statusCode).toEqual(400);
            }
        }
    });
    test("Caso de erro, criando uma competição com nome que não é do tipo string", async () => {
        expect.assertions(2);
        try {
            const name = true;
            const attempts = 1;
            await competitionBusiness.create(name, attempts);
        }
        catch (error) {
            if (error instanceof BaseError_1.BaseError) {
                expect(error.message).toEqual("Parâmetro 'name' inválido: deve ser uma string");
                expect(error.statusCode).toEqual(400);
            }
        }
    });
    test("Caso de erro, criando uma competição com attempts que não é do tipo number", async () => {
        expect.assertions(2);
        try {
            const name = "competition-mock";
            const attempts = "attempts-mock";
            await competitionBusiness.create(name, attempts);
        }
        catch (error) {
            if (error instanceof BaseError_1.BaseError) {
                expect(error.message).toEqual("Parâmetro 'attempts' inválido: deve ser um number");
                expect(error.statusCode).toEqual(400);
            }
        }
    });
    test("Caso de erro, criando uma competição com um nome que já existe", async () => {
        expect.assertions(2);
        try {
            const name = "competition-mock";
            const attempts = 3;
            await competitionBusiness.create(name, attempts);
        }
        catch (error) {
            if (error instanceof BaseError_1.BaseError) {
                expect(error.message).toEqual("Competição já cadastrada");
                expect(error.statusCode).toEqual(409);
            }
        }
    });
});
//# sourceMappingURL=create.test.js.map