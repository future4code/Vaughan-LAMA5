import {
  UserInputDTO,
  LoginInputDTO,
  UserDataBaseDTO,
  UserRole,
  User
} from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { IUSerDataBase } from "../model/IUserDataBase";

export class UserBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private autenthicator: Authenticator,
    private hashPassword: HashManager,
    private userData: IUSerDataBase
  ) {}
  async createUser(user: UserInputDTO) {
    console.log("chegou aaa");
    const { name, email, password, role } = user;
    if (!name || !email || !password) {
      throw new Error(
        "Verifique se os campos estão sendo passados corretamentes!"
      );
    }
    console.log("antes de vericar email");
    // const verifyEmailExist = this.userData.getUserByEmail(email);
    // console.log("2");
    // if (verifyEmailExist) {
    //   throw new Error("Usuário já existe");
    // }

    const id = this.idGenerator.generate();
    console.log("3");
    const hashPassword = await this.hashPassword.hash(user.password);
    console.log("4");
    // const userDatabase = new UserDatabase();
    console.log("5");
    const newUser: UserDataBaseDTO = {
      id,
      name,
      email,
      password: hashPassword,
      role: "NORMAL"
    };
    console.log(newUser);
    await this.userData.createUser(newUser);

    const accessToken = this.autenthicator.generateToken({
      id,
      role: user.role
    });

    return accessToken;
  }

  async getUserByEmail(user: LoginInputDTO) {
    const userDatabase = new UserDatabase();
    const userFromDB = await userDatabase.getUserByEmail(user.email);

    const hashManager = new HashManager();
    const hashCompare = await hashManager.compare(
      user.password,
      userFromDB.getPassword()
    );

    const authenticator = new Authenticator();
    const accessToken = authenticator.generateToken({
      id: userFromDB.getId(),
      role: userFromDB.getRole()
    });

    if (!hashCompare) {
      throw new Error("Invalid Password!");
    }

    return accessToken;
  }
}
