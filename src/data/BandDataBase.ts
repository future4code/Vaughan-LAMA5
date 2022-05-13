import { Band } from "../model/Band";
import { IBandUserData } from "../model/IBandDataBase";
import { BaseDatabase } from "./BaseDatabase";

export class BandUserData extends BaseDatabase implements IBandUserData {
  private static TABLE_NAME = "lama_band";
  async findBandByName(name: string): Promise<Band> {
    const resultBand = await this.getConnection()
      .select("*")
      .from(BandUserData.TABLE_NAME)
      .where({ name });
    return resultBand[0];
  }

  async inserBandData(band: Band): Promise<void> {
    await this.getConnection().insert(band).into(BandUserData.TABLE_NAME);
  }

  async getBandById(id: string): Promise<Band> {
    const resultBand = await this.getConnection()
      .select("*")
      .from(BandUserData.TABLE_NAME)
      .where({ id });
    return resultBand[0];
  }
}
