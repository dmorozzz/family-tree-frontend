export class Member {
  constructor(
    public id: string,
    public name: string,
    public age: number,
    public children: Member[],
  ) { }
}
