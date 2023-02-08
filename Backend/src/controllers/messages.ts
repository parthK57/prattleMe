import connectionPool from "../database/db";
import ErrorHandler from "../Services/ErrorHandler";

const db = connectionPool;

export const sendMessageHandler = async (req: any, res: any, next: any) => {
  const body = req.body;
  const email = body.email;
  const message = body.message;

  const currentTime = new Date();
  const currentOffset = currentTime.getTimezoneOffset();
  const ISTOffset = 330;
  const ISTTime = new Date(
    currentTime.getTime() + (ISTOffset + currentOffset) * 60000
  );
  const timestamp = `${ISTTime.getDate()}/${
    ISTTime.getMonth() + 1
  }/${ISTTime.getFullYear()} ${ISTTime.getHours()}:${ISTTime.getMinutes()}:${ISTTime.getSeconds()}:${ISTTime.getMilliseconds()}`;

  // @ts-expect-error
  db.execute(
    "INSERT INTO messages (email, message, timestamp) VALUES (?,?,?);",
    [email, message, timestamp],
    (err: Error, results: any) => {
      if (err) return next(new ErrorHandler(err.message, 500));
      else res.status(201).json({ message: "RECIEVED" });
    }
  );
};

export const getMessageHandler = async (req: any, res: any, next: any) => {
  // @ts-expect-error
  db.execute("SELECT * FROM messages;", (err, results) => {
    if (err) return next(new ErrorHandler(err.message, 500));
    else {
      res.status(200).send(results);
    }
  });
};
