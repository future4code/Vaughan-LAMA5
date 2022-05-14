import { ShowDTO } from "../model/Band";
import { IShowData } from "../model/IShowData";
import { Show, User } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class ShowBusiness {
  constructor(
    private authenticator: Authenticator,
    private idGeneration: IdGenerator,
    private showData: IShowData
  ) {}
  createShow = async (input: ShowDTO): Promise<void> => {
    const { week_day, start_time, end_time, band_id, token } = input;
    console.log(week_day, start_time, end_time, band_id);

    if (!week_day || !start_time || !end_time || !band_id) {
      //   throw new BaseError("Por favor verifique todos os campos", 422);
      throw new Error("Por favor verifique todos os campos");
    }

    if (start_time.length > 2 || end_time.length > 2) {
      throw new Error("os horarios tem que ser redondo");
    }

    if (Number(start_time) < 8 || Number(end_time) > 23) {
      throw new Error("o Show tem que ser entre 8 e 23h");
    }

    if (!token) {
      throw new Error("É necessário passar um token");
    }
    const tokenData = this.authenticator.getData(token);

    if (!tokenData) {
      throw new Error("Usuário deslogado");
    }

    const roleDay = User.dayToShowRole(week_day);

    const id = this.idGeneration.generationId();

    const isVerifyShowExist = await this.showData.getBandById(band_id);

    if (!isVerifyShowExist) {
      throw new Error("Banda não existe !");
    }

    const show: Show = {
      id,
      week_day: roleDay,
      start_time,
      end_time,
      band_id
    };

    await this.showData.InsertShow(show);
  };

  returnAllShow = async (day: string, token: string): Promise<Show[]> => {
    if (!day) {
      throw new Error("É preciso passar um dia");
    }
    if (!token) {
      throw new Error("É preciso passar o token de acesso");
    }

    const tokenData = this.authenticator.getData(token);
    if (!tokenData) {
      throw new Error("Usuário deslogado");
    }
    const newDay = User.dayToShowRole(day);
    const getAllShow = await this.showData.getShowByDay(newDay);
    return getAllShow;
  };
}
