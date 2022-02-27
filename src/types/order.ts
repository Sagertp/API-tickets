import { BasicTicket, Ticket } from "./ticket";
import { BasicUser, User } from "./user";

export interface BasicOrder {
  ticket: BasicTicket,
  user: BasicUser
}

export interface Order extends BasicOrder {
  orderId: number
}

export interface OrderWithDetails extends Order {
  ticket: Ticket,
  user: User
}
