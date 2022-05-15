import { Photo } from "./Photo";

export interface IPhotoData {
  insertPhoto(photo: Photo): Promise<void>;
}
