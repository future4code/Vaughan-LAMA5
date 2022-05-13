import { Show } from "./User";



export interface IShowData{
    InsertShow(input: Show): Promise<void>;
    getBandById(id: string): Promise<boolean>;
}