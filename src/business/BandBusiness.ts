import { BaseError } from "../error/BaseError";
import { Band, BandDTO } from "../model/Band";
import { IBandUserData } from "../model/IBandDataBase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class BandUserBussines {
  constructor(
    private authenticator: Authenticator,
    private idGeneration: IdGenerator,
    private bandData: IBandUserData
  ) {}
  createBandBusiness = async (input: BandDTO, token: string): Promise<void> => {
    const { name, musicGenre, lider } = input;
    if (!name || !musicGenre || !lider) {
      //   throw new BaseError("Por favor verifique todos os campos", 422);
      throw new Error("Por favor verifique todos os campos");
    }
    if (!token) {
      throw new Error("É necessário passar um token");
    }
    const tokenData = this.authenticator.getData(token);
    if (!tokenData) {
      throw new Error("Usuário deslogado");
    }

    const getBandById = await this.bandData.findBandByName(name);
    if (getBandById) {
      throw new Error("Essa banda já existe");
    }
    if (tokenData.role !== "ADMIN") {
      throw new Error("Você não tem autorização para cadastrar uma banda");
    }
    const id = this.idGeneration.generationId();
    const sendBandInfo: Band = {
      id,
      name,
      music_genre: musicGenre,
      lider
    };

    await this.bandData.inserBandData(sendBandInfo);
  };
}
