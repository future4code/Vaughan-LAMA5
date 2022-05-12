import express, { request, response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserController } from "../controller/UserController";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export const userRouter = express.Router();

const id = new IdGenerator();
const autenthicator = new Authenticator();
const hashManager = new HashManager();
const userData = new UserDatabase();
const userBusiness = new UserBusiness(id, autenthicator, hashManager, userData);
const userController = new UserController(userBusiness);

userRouter.post("/signup",(req, res) => userController.signup(req, res));
// userRouter.post("/login", userController.login);

