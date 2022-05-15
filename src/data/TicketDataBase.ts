import { ITicketData } from "../model/ITicketData";
import { Ticket } from "../model/Ticket";
import { BaseDatabase } from "./BaseDatabase";

export class TicketDataBase extends BaseDatabase implements ITicketData {
  private TABLE_TICKET = "lama_ticket";
  insertTicket = async (ticket: Ticket): Promise<void> => {
    await this.getConnection().insert(ticket).into(this.TABLE_TICKET);
  };

  getTicketById = async (id: string): Promise<boolean> => {
    const result = await this.getConnection()
      .from(this.TABLE_TICKET)
      .where({ id_ticket: id });
    if (result.length === 0) {
      return true;
    } else {
      return false;
    }
  };
}
