import connectionPool from "../database/db";
import ErrorHandler from "../Services/ErrorHandler";

const db = connectionPool;

export const sendMessageHandler = async (req: any, res: any, next: any) => {
  const body = req.body;
  const email = body.email as string;
  const clientEmail = body.clientEmail as string;
  const message = body.message as string;

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
  await db.execute(
    "INSERT INTO messages (email, message, timestamp, clientEmail) VALUES (?,?,?,?);",
    [email, message, timestamp, clientEmail],
    (err: Error, results: any) => {
      if (err) return next(new ErrorHandler(err.message, 500));
      else res.status(201).send("RECIEVED!");
    }
  );
};

export const getMessageHandler = async (req: any, res: any, next: any) => {
  const body = req.body;
  const email = body.email as string;
  const clientEmail = body.clientEmail as string;

  interface resultOBJ {
    email: string;
    message: string;
    timestamp: string;
    clientEmail: string;
  }

  type result = Array<resultOBJ>;
  // @ts-expect-error
  db.execute(
    "SELECT email, message, timestamp, clientEmail FROM messages WHERE email = ? AND clientEmail = ? OR email = ? AND clientEmail = ?;",
    [email, clientEmail, clientEmail, email],
    (err: Error, results: result) => {
      if (err) return next(new ErrorHandler(err.message, 500));
      else {
        res.status(200).send(results);
      }
    }
  );
};

export const sendGroupMessageHandler = async (
  req: any,
  res: any,
  next: any
) => {
  const body = req.body;
  const username = body.username as string;
  const groupname = body.groupname as string;
  const message = body.message as string;
  const groupid = body.groupid as string;

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
  await db.execute(
    "INSERT INTO groupmessages (groupname, message, `from`, timestamp, groupid) VALUES (?,?,?,?,?);",
    [groupname, message, username, timestamp, groupid],
    (err: Error, results: any) => {
      if (err) return next(new ErrorHandler(err.message, 500));
      else res.status(201).send("RECIEVED!");
    }
  );
};

export const getGroupMessageHandler = async (req: any, res: any, next: any) => {
  const body = req.body;
  const groupname = body.groupname as string;
  const groupid = body.groupid as string;

  // @ts-expect-error
  await db.execute(
    "SELECT message, `from` FROM groupmessages WHERE groupname = ? AND groupid = ?;",
    [groupname, groupid],
    (err: Error, results: any) => {
      if (err) return next(new ErrorHandler(err.message, 500));
      else res.status(200).json(results);
    }
  );
};
