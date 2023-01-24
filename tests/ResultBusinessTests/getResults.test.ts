import { ResultBusiness } from "../../src/business/ResultBusiness";
import { BaseError } from "../../src/errors/BaseError";
import { ICreateResultInputDTO } from "../../src/models/Result";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { ResultDatabaseMock } from "../mocks/ResultDatabaseMock";

describe("Testanto getResults da ResultBusiness", () => {
  const resultBusiness = new ResultBusiness(
    new ResultDatabaseMock(),
    new IdGeneratorMock()
  );

  test("Caso de sucesso do ranking da competição de dardos", async () => {
    const id: string = "id-mock-dart";

    const result = await resultBusiness.getResults(id);
    expect(result.ranking).toEqual({
      competition: "competition-mock",
      athlete: "athlete-mock",
      result: 20,
      unit: "unit-mock",
    });
  });
  test("Caso de sucesso do ranking da competição de natação", async () => {
    const id: string = "id-mock-swimming";

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
      const id: string = "undefined-competition-id";
      await resultBusiness.getResults(id);
    } catch (error) {
      if (error instanceof BaseError) {
        expect(error.message).toEqual("Competição não encontrada");
        expect(error.statusCode).toEqual(404);
      }
    }
  });
});
