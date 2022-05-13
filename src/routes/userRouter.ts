import express, { request, response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserController } from "../controller/UserController";
import { UserDatabase } from "../data/UserDatabase";

export const userRouter = express.Router();
const userData = new UserDatabase();
const userBusiness = new UserBusiness(userData);
const userController = new UserController(userBusiness);

userRouter.post("/signup", (req, res) => userController.signup(req, res));
userRouter.post("/login", (req, res) => userController.login(req, res));
