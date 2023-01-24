import { ResultDatabaseMock } from "./../mocks/ResultDatabaseMock";
import { ResultBusiness } from "./../../src/business/ResultBusiness";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { ICreateResultInputDTO } from "../../src/models/Result";
import { BaseError } from "../../src/errors/BaseError";
describe("Testanto create da ResultBusiness", () => {
  const resultBusiness = new ResultBusiness(
    new ResultDatabaseMock(),
    new IdGeneratorMock()
  );

  test("Caso de sucesso da competição de dardos", async () => {
    const input: ICreateResultInputDTO = {
      value: 1,
      value_2: 2,
      value_3: 3,
      unit: "unit-mock",
      competitionId: "id-mock-dart",
      athleteId: "athlete-id-mock",
    };

    const result = await resultBusiness.create(input);
    expect(result.message).toEqual("Resultado cadastrado com sucesso");
  });
  test("Caso de sucesso da competição de natação", async () => {
    const input: ICreateResultInputDTO = {
      value: 1,
      value_2: 0,
      value_3: 0,
      unit: "unit-mock",
      competitionId: "id-mock-swimming",
      athleteId: "athlete-id-mock",
    };
    const result = await resultBusiness.create(input);
    expect(result.message).toEqual("Resultado cadastrado com sucesso");
  });

  test("Caso de erro, criando uma competição de dardo com somente 1 valor", async () => {
    expect.assertions(2);
    try {
      const input: ICreateResultInputDTO = {
        value: 1,
        value_2: 0,
        value_3: 0,
        unit: "unit-mock",
        competitionId: "id-mock-dart",
        athleteId: "athlete-id-mock",
      };
      await resultBusiness.create(input);
    } catch (error) {
      if (error instanceof BaseError) {
        expect(error.message).toEqual(
          "Essa competição requer 3 valores para os resultados"
        );
        expect(error.statusCode).toEqual(400);
      }
    }
  });
  test("Caso de erro, criando uma competição de natação com mais de 1 valor", async () => {
    expect.assertions(2);
    try {
      const input: ICreateResultInputDTO = {
        value: 1,
        value_2: 2,
        value_3: 3,
        unit: "unit-mock",
        competitionId: "id-mock-swimming",
        athleteId: "athlete-id-mock",
      };
      await resultBusiness.create(input);
    } catch (error) {
      if (error instanceof BaseError) {
        expect(error.message).toEqual(
          "Nessa competição, só se pode cadastrar 1 valor para os resultados"
        );
        expect(error.statusCode).toEqual(400);
      }
    }
  });
  test("Caso de erro, quando é digitado um valor negativo", async () => {
    expect.assertions(2);
    try {
      const input: ICreateResultInputDTO = {
        value: -1,
        value_2: 2,
        value_3: 3,
        unit: "unit-mock",
        competitionId: "id-mock-dart",
        athleteId: "athlete-id-mock",
      };
      await resultBusiness.create(input);
    } catch (error) {
      if (error instanceof BaseError) {
        expect(error.message).toEqual(
          "O valor do resultado deve ser um número positivo"
        );
        expect(error.statusCode).toEqual(400);
      }
    }
  });
  test("Caso de erro, competição inexistente", async () => {
    expect.assertions(2);
    try {
      const input: ICreateResultInputDTO = {
        value: 1,
        value_2: 0,
        value_3: 0,
        unit: "unit-mock",
        competitionId: "undefined-id-mock",
        athleteId: "athlete-id-mock",
      };
      await resultBusiness.create(input);
    } catch (error) {
      if (error instanceof BaseError) {
        expect(error.message).toEqual("Competição não encontrada");
        expect(error.statusCode).toEqual(404);
      }
    }
  });
  test("Caso de erro, competição encerrada", async () => {
    expect.assertions(2);
    try {
      const input: ICreateResultInputDTO = {
        value: 1,
        value_2: 0,
        value_3: 0,
        unit: "unit-mock",
        competitionId: "id-mock-closed",
        athleteId: "athlete-id-mock",
      };
      await resultBusiness.create(input);
    } catch (error) {
      if (error instanceof BaseError) {
        expect(error.message).toEqual("Competição encerrada");
        expect(error.statusCode).toEqual(409);
      }
    }
  });
  test("Caso de erro, id do atleta inválido", async () => {
    expect.assertions(2);
    try {
      const input: ICreateResultInputDTO = {
        value: 1,
        value_2: 0,
        value_3: 0,
        unit: "unit-mock",
        competitionId: "id-mock-swimming",
        athleteId: "undefined-athlete-id",
      };
      await resultBusiness.create(input);
    } catch (error) {
      if (error instanceof BaseError) {
        expect(error.message).toEqual("Atleta não encontrado");
        expect(error.statusCode).toEqual(404);
      }
    }
  });
});
