"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IdGeneratorMock_1 = require("./../mocks/IdGeneratorMock");
const AthleteDatabaseMock_1 = require("./../mocks/AthleteDatabaseMock");
const AthleteBusiness_1 = require("./../../src/business/AthleteBusiness");
const BaseError_1 = require("../../src/errors/BaseError");
describe("Testanto create da AthleteBusiness", () => {
    const athleteBusiness = new AthleteBusiness_1.AthleteBusiness(new AthleteDatabaseMock_1.AthleteDatabaseMock(), new IdGeneratorMock_1.IdGeneratorMock());
    test("Caso de sucesso", async () => {
        const name = "athlete-mock";
        const result = await athleteBusiness.create(name);
        expect(result.message).toEqual("Atleta cadastrado com sucesso");
    });
    test("Caso de erro, criando um atleta com o nome do tipo number", async () => {
        expect.assertions(2);
        try {
            const name = 1;
            await athleteBusiness.create(name);
        }
        catch (error) {
            if (error instanceof BaseError_1.BaseError) {
                expect(error.message).toEqual("Parâmetro 'name' inválido: deve ser uma string");
                expect(error.statusCode).toEqual(400);
            }
        }
    });
});
//# sourceMappingURL=create.test.js.map