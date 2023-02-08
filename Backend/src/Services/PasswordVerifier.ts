import bcrypt from "bcrypt";
import connectionPool from "../database/db";
import ErrorHandler from "./ErrorHandler";

const db = connectionPool;

const PasswordVerifier = async (req: any, res: any, next: any) => {
  const body = req.body;
  const email = body.email as string;
  const password = body.password as string;

  interface DbResult {
    password: string;
  }
  type DBR = Array<DbResult>;

  // @ts-expect-error
  await db.execute(
    "SELECT password FROM users WHERE email = ?",
    [email],
    (err: Error, results: DBR) => {
      if (err) {
        return next(err);
      } else {
        if (results.length == 0)
          return next(new ErrorHandler("User not registered!", 404));
        else {
          const hashedPassword = results[0].password;
          bcrypt.compare(password, hashedPassword, (err, results) => {
            if (err) return next(err);
            else if (results) next();
            else next(new ErrorHandler("Unauthorized!", 401));
          });
        }
      }
    }
  );
};

export default PasswordVerifier;
