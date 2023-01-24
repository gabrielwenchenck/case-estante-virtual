import { IdGeneratorMock } from "./../mocks/IdGeneratorMock";
import { AthleteDatabaseMock } from "./../mocks/AthleteDatabaseMock";
import { AthleteBusiness } from "./../../src/business/AthleteBusiness";
import { BaseError } from "../../src/errors/BaseError";
describe("Testanto create da AthleteBusiness", () => {
  const athleteBusiness = new AthleteBusiness(
    new AthleteDatabaseMock(),
    new IdGeneratorMock()
  );

  test("Caso de sucesso", async () => {
    const name: string = "athlete-mock";

    const result = await athleteBusiness.create(name);
    expect(result.message).toEqual("Atleta cadastrado com sucesso");
  });

  test("Caso de erro, criando um atleta com o nome do tipo number", async () => {
    expect.assertions(2);

    try {
      const name: any = 1;
      await athleteBusiness.create(name);
    } catch (error) {
      if (error instanceof BaseError) {
        expect(error.message).toEqual(
          "Parâmetro 'name' inválido: deve ser uma string"
        );
        expect(error.statusCode).toEqual(400);
      }
    }
  });
});
