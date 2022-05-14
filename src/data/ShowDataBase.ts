import { IShowData } from "../model/IShowData";
import { Show } from "../model/User";
import { BaseDatabase } from "./BaseDatabase";

export class ShowDataBase extends BaseDatabase implements IShowData {
  private TABLE_SHOW = "lama_shows";
  private TABLE_BAND = "lama_band";

  async InsertShow(show: Show): Promise<void> {
    await this.getConnection().insert(show).into(this.TABLE_SHOW);
  }

  async getBandById(id: string): Promise<boolean> {
    const resultBand = await this.getConnection()
      .select("*")
      .from(this.TABLE_BAND)
      .where({ id });

    if (resultBand.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  async getShowByDay(day: string): Promise<Show[]> {
    const result: Show[] = await this.getConnection()
      .select("name", "music_genre")
      .join("lama_band", "band_id", "=", "lama_band.id")
      .from(this.TABLE_SHOW)
      .where({ week_day: day })
      .orderBy("start_time");
    return result;
  }
}