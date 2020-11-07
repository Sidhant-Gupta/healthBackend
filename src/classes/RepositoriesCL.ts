import { getRepository, Repository } from "typeorm";
import  { User } from "../entity/User";

export default class Repositories{
  private static repositories: Repositories;
  usersRepository: Repository<User>;

  private constructor(){
    this.usersRepository=getRepository(User);
  }

  public static async getInstance() {
    if (!this.repositories) {
      this.repositories = new Repositories();
    }
    return this.repositories;
  }
}