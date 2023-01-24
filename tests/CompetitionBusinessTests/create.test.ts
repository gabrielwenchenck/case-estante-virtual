import { CompetitionDatabaseMock } from "./../mocks/CompetitionDatabaseMock";
import { CompetitionBusiness } from "./../../src/business/CompetitionBusiness";
import { IdGeneratorMock } from "./../mocks/IdGeneratorMock";
import { BaseError } from "../../src/errors/BaseError";
describe("Testanto create da CompetitionBusiness", () => {
  const competitionBusiness = new CompetitionBusiness(
    new CompetitionDatabaseMock(),
    new IdGeneratorMock()
  );

  test("Caso de sucesso", async () => {
    const name: string = "athlete-mock";
    const attempts: number = 3;

    const result = await competitionBusiness.create(name, attempts);
    expect(result.message).toEqual("Competição criada com sucesso");
  });

  test("Caso de erro, criando uma competição sem nome", async () => {
    expect.assertions(2);

    try {
      const name: string = "";
      const attempts: number = 1;
      await competitionBusiness.create(name, attempts);
    } catch (error) {
      if (error instanceof BaseError) {
        expect(error.message).toEqual(
          "Deve ser passado o nome e a quantidade de chances da competição"
        );
        expect(error.statusCode).toEqual(400);
      }
    }
  });
  test("Caso de erro, criando uma competição sem chances", async () => {
    expect.assertions(2);

    try {
      const name: string = "competition-mock";
      const attempts: number = 0;
      await competitionBusiness.create(name, attempts);
    } catch (error) {
      if (error instanceof BaseError) {
        expect(error.message).toEqual(
          "Deve ser passado o nome e a quantidade de chances da competição"
        );
        expect(error.statusCode).toEqual(400);
      }
    }
  });
  test("Caso de erro, criando uma competição com nome que não é do tipo string", async () => {
    expect.assertions(2);

    try {
      const name: any = true;
      const attempts: number = 1;
      await competitionBusiness.create(name, attempts);
    } catch (error) {
      if (error instanceof BaseError) {
        expect(error.message).toEqual(
          "Parâmetro 'name' inválido: deve ser uma string"
        );
        expect(error.statusCode).toEqual(400);
      }
    }
  });
  test("Caso de erro, criando uma competição com attempts que não é do tipo number", async () => {
    expect.assertions(2);

    try {
      const name: string = "competition-mock";
      const attempts: any = "attempts-mock";
      await competitionBusiness.create(name, attempts);
    } catch (error) {
      if (error instanceof BaseError) {
        expect(error.message).toEqual(
          "Parâmetro 'attempts' inválido: deve ser um number"
        );
        expect(error.statusCode).toEqual(400);
      }
    }
  });
  test("Caso de erro, criando uma competição com um nome que já existe", async () => {
    expect.assertions(2);

    try {
      const name: string = "competition-mock";
      const attempts: number = 3;
      await competitionBusiness.create(name, attempts);
    } catch (error) {
      if (error instanceof BaseError) {
        expect(error.message).toEqual("Competição já cadastrada");
        expect(error.statusCode).toEqual(409);
      }
    }
  });
});
