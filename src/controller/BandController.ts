import { Request, Response } from "express";
import { BandUserBussines } from "../business/BandBusiness";
import { BandDTO } from "../model/Band";

export class BandController {
  constructor(private bandUserBusiness: BandUserBussines) {}
  createBand = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, musicGenre, lider } = req.body;
      const token = req.headers.authorization;
      const input: BandDTO = {
        name,
        musicGenre,
        lider
      };
      await this.bandUserBusiness.createBandBusiness(input, token);
      res.status(201).send({ message: "Banda criado com sucesso!" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      } else if (error) {
        res.status(400).send(error.sqlMessage);
      } else {
        res.status(500).send({ message: "Erro ao se conectar com o servidor" });
      }
    }
  };
}
