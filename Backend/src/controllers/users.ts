import { Body } from "../models/Body";
import bcrypt from "bcrypt";
import connectionPool from "../database/db";

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
