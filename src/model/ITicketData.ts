import { Ticket } from "./Ticket";

export interface ITicketData {
  insertTicket(ticket: Ticket): Promise<void>;
  getTicketById(id: string): Promise<boolean>;
}
