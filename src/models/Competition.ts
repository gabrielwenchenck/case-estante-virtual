export interface ICompetitionDB {
  id: string;
  name: string;
  is_closed: boolean;
  attempts: number;
}

export class Competition {
  constructor(
    private id: string,
    private name: string,
    private attempts: number,
    private isClosed?: boolean | undefined
  ) {}

  public getId = () => {
    return this.id;
  };

  public getName = () => {
    return this.name;
  };

  public getIsClosed = () => {
    return this.isClosed;
  };
  public getAttempts = () => {
    return this.attempts;
  };

  public setId = (newId: string) => {
    this.id = newId;
  };

  public setName = (newName: string) => {
    this.name = newName;
  };

  public setIsClosed = (newIsClosed: boolean) => {
    this.isClosed = newIsClosed;
  };
  public setIsAttempts = (newAttempts: number) => {
    this.attempts = newAttempts;
  };
}
