import { Request, Response } from "express";
import { UserInputDTO, LoginInputDTO } from "../model/User";
import { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { UserDatabase } from "../data/UserDatabase";

export class UserController {
  constructor(private userBusiness: UserBusiness) {}
  async signup(req: Request, res: Response): Promise<string> {
    try {
      const input: UserInputDTO = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        role: req.body.role
      };
      // const id = new IdGenerator();
      // const autenthicator = new Authenticator();
      // const hashManager = new HashManager();
      // const userData = new UserDatabase();
      // const userBusiness = new UserBusiness(
      //   id,
      //   autenthicator,
      //   hashManager,
      //   userData
      // );
      // console.log(this.userBusiness);
      await this.userBusiness.createUser(input);
      const token = await this.userBusiness.createUser(input);

      res.status(201).send({ token });
      return token;
    } catch (error) {
      res.status(400).send({ error: error.message });
    }

    await BaseDatabase.destroyConnection();
  }

  // async login(req: Request, res: Response) {
  //   try {
  //     const loginData: LoginInputDTO = {
  //       email: req.body.email,
  //       password: req.body.password
  //     };
  //     const token = await this.userBusiness.getUserByEmail(loginData);

  //     res.status(200).send({ token });
  //   } catch (error) {
  //     res.status(400).send({ error: error.message });
  //   }

  //   await BaseDatabase.destroyConnection();
  // }
}
