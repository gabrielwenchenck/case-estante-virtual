export interface IAthleteDB {
  id: string;
  name: string;
}

export class Athlete {
  constructor(private id: string, private name: string) {}

  public getId = () => {
    return this.id;
  };

  public getName = () => {
    return this.name;
  };

  public setId = (newId: string) => {
    this.id = newId;
  };

  public setName = (newName: string) => {
    this.name = newName;
  };
}
