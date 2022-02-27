import { BasicOrder, Order, OrderWithDetails } from "../types/order";
import { db } from "../db";
import { OkPacket, RowDataPacket } from "mysql2";

export const create = (order: BasicOrder, callback: Function) => {
  const queryString =
    "INSERT INTO ticketOrder (id_ticket, id_user) VALUES (?, ?)";

  db.query(
    queryString,
    [order.ticket.id_ticket, order.user.id_user],
    (err, result) => {
      if (err) {
        return callback(err);
      }

      const insertId = (<OkPacket>result).insertId;
      callback(null, insertId);
    }
  );
};

export const findByIdUser = (id_user: number, callback: Function) => {
  const queryString = `
    SELECT 
      o.*,
      t.*,
      u.name AS user_name,
      u.email
    FROM ticketOrder AS o
    INNER JOIN user AS u ON u.id_user=o.id_user
    INNER JOIN ticket AS t ON t.id_ticket=o.id_ticket
    WHERE o.id_user=?`;

  db.query(queryString, id_user, (err, result) => {
    if (err) {
      return callback(err);
    }

    if ((<RowDataPacket>result)[0] === undefined) {
      const err = new Error(`Order with id: ${id_user} do not exist.`);
      return callback(err);
    }

    const row = <RowDataPacket>result;

    callback(null, row);
  });
};

export const findOne = (orderId: number, callback: Function) => {
  const queryString = `
    SELECT 
      o.*,
      t.*,
      u.name AS user_name,
      u.email
    FROM ticketOrder AS o
    INNER JOIN user AS u ON u.id_user=o.id_user
    INNER JOIN ticket AS t ON t.id_ticket=o.id_ticket
    WHERE o.id_order=?`;

  db.query(queryString, orderId, (err, result) => {
    if (err) {
      return callback(err);
    }

    if ((<RowDataPacket>result)[0] === undefined) {
      const err = new Error(`Order with id: ${orderId} do not exist.`);
      return callback(err);
    }

    const row = (<RowDataPacket>result)[0];
    const order: OrderWithDetails = {
      orderId: row.id_order,
      ticket: {
        id_ticket: row.id_ticket,
        name: row.name,
        description: row.description,
      },
      user: {
        id_user: row.id_user,
        id_type_user: row.id_type_user,
        name: row.user_name,
        email: row.email,
      },
    };
    callback(null, order);
  });
};

export const findAll = (callback: Function) => {
  const queryString = `
   SELECT 
      o.*,
      t.*,
      u.id_type_user AS user_type,
      u.name AS user_name,
      u.email
    FROM ticketOrder AS o
    INNER JOIN user AS u ON u.id_user=o.id_user
    INNER JOIN ticket AS t ON t.id_ticket=o.id_ticket`;

  db.query(queryString, (err, result) => {
    if (err) {
      return callback(err);
    }

    const rows = <RowDataPacket[]>result;
    console.log(`Fetch all Orders`);
    const orders: Order[] = [];

    rows.forEach((row) => {
      const order: OrderWithDetails = {
        orderId: row.id_order,
        ticket: {
          id_ticket: row.id_ticket,
          name: row.name,
          description: row.description,
        },
        user: {
          id_user: row.id_user,
          id_type_user: row.user_type,
          name: row.user_name,
          email: row.email,
        },
      };
      orders.push(order);
    });
    callback(null, orders);
  });
};

export const update = (order: Order, callback: Function) => {
  const queryString = `UPDATE ticketOrder SET id_ticket=?, id_user=? WHERE id_order=?`;

  db.query(
    queryString,
    [order.ticket.id_ticket, order.user.id_user],
    (err, result) => {
      if (err) {
        return callback(err);
      }

      if ((<RowDataPacket>result)[0] === undefined) {
        const err = new Error(`Ordee: ${order} do not exist.`);
        return callback(err);
      }
      callback(null, result);
    }
  );
};
