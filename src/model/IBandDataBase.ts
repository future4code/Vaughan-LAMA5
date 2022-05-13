import { Band } from "./Band";

export interface IBandUserData {
  inserBandData(band: Band): Promise<void>;
  findBandByName(name: string): Promise<Band>;
}
