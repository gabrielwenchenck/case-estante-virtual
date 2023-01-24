import { CompetitionBusiness } from "../../src/business/CompetitionBusiness";
import { BaseError } from "../../src/errors/BaseError";
import { CompetitionDatabaseMock } from "../mocks/CompetitionDatabaseMock";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";

describe("Testanto close da CompetitionBusiness", () => {
  const competitionBusiness = new CompetitionBusiness(
    new CompetitionDatabaseMock(),
    new IdGeneratorMock()
  );

  test("Caso de sucesso", async () => {
    const id: string = "id-mock";

    const result = await competitionBusiness.close(id);
    expect(result.message).toEqual("Competição finalizada com sucesso");
  });

  test("Caso de erro, quando não é passado o id", async () => {
    expect.assertions(2);

    try {
      const id: string = "";
      await competitionBusiness.close(id);
    } catch (error) {
      if (error instanceof BaseError) {
        expect(error.message).toEqual("Deve ser passado o id competição");
        expect(error.statusCode).toEqual(400);
      }
    }
  });
  test("Caso de erro, competição inexistente", async () => {
    expect.assertions(2);

    try {
      const id: string = "undefined-id-mock";
      await competitionBusiness.close(id);
    } catch (error) {
      if (error instanceof BaseError) {
        expect(error.message).toEqual("Competição não encontrada");
        expect(error.statusCode).toEqual(404);
      }
    }
  });
});
