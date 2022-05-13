export interface BandDTO {
  name: string;
  musicGenre: string;
  lider: string;
}

export type Band = {
  id: string;
  name: string;
  music_genre: string;
  lider: string;
};


export type DetailBandDTO = {
  token: string;
  id: string;
  name?: string;
};
