export interface IResultDB {
  id: string;
  value: number;
  value_2: number;
  value_3: number;
  unit: string;
  competition_id: string;
  athlete_id: string;
}

export class Result {
  constructor(
    private id: string,
    private value: number,
    private value_2: number,
    private value_3: number,
    private unit: string,
    private competitionId: string,
    private athleteId: string
  ) {}

  public getId = () => {
    return this.id;
  };

  public getValue = () => {
    return this.value;
  };
  public getValue2 = () => {
    return this.value_2;
  };
  public getValue3 = () => {
    return this.value_3;
  };

  public getUnit = () => {
    return this.unit;
  };

  public getCompetitionId = () => {
    return this.competitionId;
  };

  public getAthleteId = () => {
    return this.athleteId;
  };

  public setId = (newId: string) => {
    this.id = newId;
  };

  public setValue = (newValue: number) => {
    this.value = newValue;
  };

  public setUnit = (newUnit: string) => {
    this.unit = newUnit;
  };

  public setCompetitionId = (newCompetitionId: string) => {
    this.competitionId = newCompetitionId;
  };

  public setAthleteId = (newAthleteId: string) => {
    this.athleteId = newAthleteId;
  };
  public setValue2 = (newValue2: number) => {
    this.value_2 = newValue2;
  };
  public setValue3 = (newValue3: number) => {
    this.value_3 = newValue3;
  };
}

export interface ICreateResultInputDTO {
  value: number;
  value_2: number;
  value_3: number;
  unit: string;
  competitionId: string;
  athleteId: string;
}

export interface IGetDartRankingDTO {
  competition: string;
  athlete: string;
  result: number;
  unit: string;
}
