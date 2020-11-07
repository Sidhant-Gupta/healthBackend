import { getRepository, Repository } from "typeorm";
import { Doctors } from "../entity/Doctors";
import { History } from "../entity/History";
import { User } from "../entity/User";

export default class Repositories {
  private static repositories: Repositories;
  usersRepository: Repository<User>;
  historyRepository: Repository<History>;
  doctorRepository: Repository<Doctors>;

  private constructor() {
    this.usersRepository = getRepository(User);
    this.historyRepository = getRepository(History);
    this.doctorRepository=getRepository(Doctors);
  }

  public static async getInstance() {
    if (!this.repositories) {
      this.repositories = new Repositories();
    }
    return this.repositories;
  }
}