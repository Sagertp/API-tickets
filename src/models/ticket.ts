import { Ticket } from "../types/ticket";
import { db } from "../db";
import { OkPacket, RowDataPacket } from "mysql2";

export const create = (ticket: Ticket, callback: Function) => {
  const queryString =
    "INSERT INTO user (id_ticket, name, description) VALUES (?, ?, ?)";

  db.query(
    queryString,
    [ticket.id_ticket, ticket.name, ticket.description],
    (err, result) => {
      if (err) {
        callback(err);
      }

      const insertId = (<OkPacket>result).insertId;
      callback(null, insertId);
    }
  );
};

export const findOne = (ticketId: number, callback: Function) => {
  const queryString = `
    SELECT * FROM ticket WHERE id_ticket=?`;

  db.query(queryString, ticketId, (err, result) => {
    if (err) {
      return callback(err);
    }

    if ((<RowDataPacket>result)[0] === undefined) {
      const err = new Error(`ticket with id: ${ticketId} do not exist.`);
      return callback(err);
    }

    const row = (<RowDataPacket>result)[0];
    const ticket: Ticket = {
      id_ticket: row.id_ticket,
      name: row.name,
      description: row.description
    };
    callback(null, ticket);
  });
};

export const findAll = (callback: Function) => {
  const queryString = `SELECT * FROM ticket`;

  db.query(queryString, (err, result) => {
    if (err) {
      callback(err);
    }

    const rows = <RowDataPacket[]>result;
    console.log(`Fetch all Tickets`);
    const tickets: Ticket[] = [];

    rows.forEach((row) => {
      const ticket: Ticket = {
        id_ticket: row.id_ticket,
        name: row.name,
	description: row.description
      };
      tickets.push(ticket);
    });
    callback(null, tickets);
  });
};

export const update = (ticket: Ticket, callback: Function) => {
  const queryString = `UPDATE ticket SET name=?, description=?  WHERE id_ticket=?`;

  db.query(
    queryString,
    [ticket.name, ticket.description, ticket.id_ticket],
    (err, result) => {
      if (err) {
        callback(err);
      }
      callback(null);
    }
  );
};
