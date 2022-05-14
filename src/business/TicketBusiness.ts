import { ITicketData } from "../model/ITicketData";
import { Ticket, TicketDTO } from "../model/Ticket";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class TicketBusiness {
  constructor(
    private authenticator: Authenticator,
    private idGeneration: IdGenerator,
    private ticketData: ITicketData
  ) {}
  createTicket = async (input: TicketDTO, token: string): Promise<void> => {
    const { name, value, id_event, quantifyTicket } = input;
    if (!name || !value || !id_event || !quantifyTicket) {
      throw new Error("verique se todos os campos foram preenchidos");
    }
    if (!token) {
      throw new Error("É necessário passar um token");
    }
    const tokenData = this.authenticator.getData(token);
    if (!tokenData) {
      throw new Error("Usuário deslogado");
    }
    if (tokenData.role !== "ADMIN") {
      throw new Error("Apenas admin pode criar um ingresso");
    }
    if (quantifyTicket === 0) {
      throw new Error("É necessário passar a quantidade de ingressos");
    }
    const id = this.idGeneration.generationId();

    const ticket: Ticket = {
      id_ticket: id,
      name,
      value,
      id_event,
      quantify_total_ticket: quantifyTicket
    };
    const isVerifyTicket = await this.ticketData.getTicketById(id);
    if (isVerifyTicket) {
      throw new Error("Esse ingresso já existe");
    }
    await this.ticketData.insertTicket(ticket);
  };
}
