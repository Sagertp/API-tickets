import { User } from "../types/user";
import { db } from "../db";
import { OkPacket, RowDataPacket } from "mysql2";

export const create = (user: User, callback: Function) => {
  const queryString =
    "INSERT INTO user (id_type_user, name, email, password) VALUES (?, ?, ?, ?)";

  db.query(
    queryString,
    [user.id_type_user, user.name, user.email, user.password],
    (err, result) => {
      if (err) {
        callback(err);
      }

      const insertId = (<OkPacket>result).insertId;
      callback(null, insertId);
    }
  );
};

export const findAll = (callback: Function) => {
  const queryString = `SELECT * FROM user`;

  db.query(queryString, (err, result) => {
    if (err) {
      callback(err);
    }

    const rows = <RowDataPacket[]>result;
    console.log(`Fetch all Users`);

    const users: User[] = [];

    rows.forEach((row) => {
      const user: User = {
        id_user: row.id_user,
        id_type_user: row.id_type_user,
        name: row.name,
        email: row.email,
      };
      users.push(user);
    });
    callback(null, users);
  });
};

export const findOne = (userId: number, callback: Function) => {
  const queryString = `
    SELECT * FROM user WHERE id_user=?`;

  db.query(queryString, userId, (err, result) => {
    if (err) {
      return callback(err);
    }

    if ((<RowDataPacket>result)[0] === undefined) {
      const err = new Error(`User with id: ${userId} do not exist.`);
      return callback(err);
    }

    const row = (<RowDataPacket>result)[0];
    const user: User = {
      id_user: row.id_user,
      id_type_user: row.id_type_user,
      name: row.name,
      email: row.email,
    };
    callback(null, user);
  });
};

export const findByUsername = (email: string, callback: Function) => {
  const queryString = `
    SELECT * FROM user WHERE email=?`;

  db.query(queryString, email, (err, result) => {
    if (err) {
      return callback(err);
    }

    if ((<RowDataPacket>result)[0] === undefined) {
      const err = new Error(`Username or password do not exist.`);
      return callback(err);
    }

    const row = (<RowDataPacket>result)[0];
    const user: User = {
      id_user: row.id_user,
      id_type_user: row.id_type_user,
      name: row.name,
      email: row.email,
      password:row.password,
    };
    callback(null, user);
  });
};


export const update = (user: User, callback: Function) => {
  const queryString = `UPDATE user SET id_type_user=?, name=?, email=?, password=?  WHERE id_user=?`;

  db.query(
    queryString,
    [user.id_type_user, user.name, user.email, user.password, user.id_user],
    (err, result) => {
      if (err) {
        callback(err);
      }
      callback(null, result);
    }
  );
};


