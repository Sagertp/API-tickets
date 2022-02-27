
export interface BasicTicket {
  id_ticket: number,
}

export interface Ticket extends BasicTicket {
  name: string,
  description: string,
}
