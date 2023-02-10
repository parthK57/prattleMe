import ErrorHandler from "../Services/ErrorHandler";
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
        return next(new ErrorHandler(err.message, 500));
      } else {
        res.status(200).send("User ID Created!");
      }
    }
  );
};

export const loginHandler = async (req: any, res: any, next: any) => {
  const email = req.body.email;

  // @ts-expect-error
  await db.execute(
    "SELECT username FROM users WHERE email = ?;",
    [email],
    (err: Error, results: any) => {
      if (err) next(new ErrorHandler(err.message, 500));
      else res.status(200).send(results[0].username);
    }
  );
};

export const addUserHandler = async (req: any, res: any, next: any) => {
  const body = req.body;
  const username = body.username as string;
  const email = body.email as string;
  const clientEmail = body.clientEmail as string;
  const clientUsername = body.clientUsername as string;
  const UUID = uuidv4();

  // @ts-expect-error
  await db.execute(
    "SELECT email, username FROM users WHERE email = ? AND username = ?;",
    [clientEmail, clientUsername],
    (err: Error, results: any) => {
      if (err) return next(new ErrorHandler(err.message, 500));
      else {
        if (results.length == 0)
          return next(new ErrorHandler("Invalid username or email!", 404));
        else {
          // @ts-expect-error
          db.execute(
            "INSERT INTO friends (user1, user2, room, user2Username) VALUES (?, ?, ?, ?)",
            [email, clientEmail, UUID, clientUsername],
            (err: Error, results: any) => {
              if (err) next(new ErrorHandler(err.message, 500));
              else {
                // @ts-expect-error
                db.execute(
                  "INSERT INTO friends (user1, user2, room, user2Username) VALUES (?, ?, ?, ?)",
                  [clientEmail, email, UUID, username],
                  (err: Error, results: any) => {
                    if (err) return next(new ErrorHandler(err.message, 500));
                    else res.status(200).send("User added!");
                  }
                );
              }
            }
          );
        }
      }
    }
  );
};

export const getFriendsHandler = async (req: any, res: any, next: any) => {
  const body = req.body;
  const email = body.email;

  // @ts-expect-error
  await db.execute(
    "SELECT user1, user2, room, user2Username FROM friends WHERE user1 = ?;",
    [email],
    (err: Error, results: any) => {
      if (err) return next(new ErrorHandler(err.message, 404));
      else res.status(200).json(results);
    }
  );
};
