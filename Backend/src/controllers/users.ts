import { Body } from "../models/Body";
import bcrypt from "bcrypt";
import connectionPool from "../database/db";
import { v4 as uuidv4 } from "uuid";

const db = connectionPool;

export const signUpHandler = async (req: any, res: any, next: any) => {
  const body: Body = req.body;
  const username = body.username;
  const email = body.email;
  const phonenumber = parseInt(body.phonenumber);
  const password = body.password;

  const hashedPassword = await bcrypt.hash(password, 10);

  const resp = db.query(
    "INSERT INTO users (username, email, phonenumber, password) VALUES (?,?,?,?);",
    [username, email, phonenumber, hashedPassword],
    (err, result, fields) => {
      if (err) {
        return next(err);
      } else {
        res.status(200).send("User ID Created!");
      }
    }
  );
};

export const loginHandler = async (req: any, res: any, next: any) => {
  res.status(200).send("OK!");
};

export const addUserHandler = async (req: any, res: any, next: any) => {
  const body = req.body;
  const email = body.email as string;
  const clientEmail = body.clientEmail as string;
  const clientUsername = body.clientUsername as string;
  const UUID = uuidv4();

  // @ts-expect-error
  await db.execute(
    "SELECT email, username FROM users WHERE email = ? AND username = ?;",
    [clientEmail, clientUsername],
    (err: Error, results: any) => {
      if (err) next(err);
      else {
        // @ts-expect-error
        db.execute(
          "INSERT INTO friends (user1, user2, isFriend, room) VALUES (?, ?, ?, ?)",
          [email, clientEmail, 1, UUID],
          (err: Error, results: any) => {
            if (err) next(err);
            else res.status(200).send("User added!");
          }
        );
      }
    }
  );
};
