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

export const createGroupHandler = async (req: any, res: any, next: any) => {
  const body = req.body;
  const email = body.email as string;
  const groupname = body.groupname as string;
  const adminname = body.adminname as string;
  const grouppassword = body.grouppassword as string;

  // @ts-expect-error -> REGISTER THE GROUP IN PRATTLMEGROUP TABLE
  await db.execute(
    "INSERT INTO prattlemegroups (groupname, admin, members, password) VALUES (?,?,?,?);",
    [groupname, adminname, email, grouppassword],
    (err: Error, results: any) => {
      if (err) return next(new ErrorHandler(err.message, 500));
      else {
        // @ts-expect-error -> REGISTER THE GROUP IN USERS TABLE-FIRST EXTRACT THE GROUP LIST
        db.execute(
          "SELECT groupname FROM users WHERE email = ?;",
          [email],
          (err: Error, results: any) => {
            if (err) {
              console.log(err);
              return next(new ErrorHandler(err.message, 500));
            } else {
              let group = results[0].groupname as string;
              if (group == null) group = "";
              // @ts-expect-error -> GET GROUP ID FROM PRATTLEMEGROUP TABLE TO UPDATE THE GROUP COLUMN IN USERS TABLE
              db.execute(
                "SELECT id FROM prattlemegroups WHERE admin = ? AND groupname = ?;",
                [adminname, groupname],
                (err: Error, results: any) => {
                  if (err) {
                    console.log(err);
                    return next(new ErrorHandler(err.message, 500));
                  } else {
                    const id = results[0].id as string;
                    if (group === "") group = id;
                    else group = group.concat(`,${id}`);
                    // @ts-expect-error -> UPDATE THE GROUP COLUMN IN THE USERS TABLE OF THE DATABASE
                    db.execute(
                      "UPDATE users SET groupname = ? WHERE email = ?;",
                      [group, email],
                      (err: Error, results: any) => {
                        if (err) {
                          console.log(err);
                          return next(new ErrorHandler(err.message, 500));
                        } else res.status(200).send("Group Created!");
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    }
  );
};

export const joinGroupHandler = async (req: any, res: any, next: any) => {
  const body = req.body;
  const email = body.email as string;
  const groupname = body.groupname as string;
  const adminname = body.adminname as string;
  const password = body.grouppassword as string;

  // @ts-expect-error -> GETTING ID AND MEMBERS FROM PRATTLEMEGROUP TABLE TO UPDATE MEMBERS COLUMN
  await db.execute(
    "SELECT id, members FROM prattlemegroups WHERE groupname = ? AND admin = ? AND password = ?;",
    [groupname, adminname, password],
    (err: Error, results: any) => {
      if (err) return next(new ErrorHandler(err.message, 500));
      else {
        const id = results[0].id;
        let members = results[0].members as string;
        members = members.concat(`,${email}`);
        // @ts-expect-error -> EXECUTING THE UPDATE OF MEMBERS COLUMN OF PRATTLEMEGROUP TABLE
        db.execute(
          "UPDATE prattlemegroups SET members = ? WHERE id = ?;",
          [members, id],
          (err: Error, results: any) => {
            if (err) return next(new ErrorHandler(err.message, 500));
            else {
              // @ts-expect-error -> GETTING GROUPS FROM USERS TABLE TO UPDATE THE GROUPNAME COLUMN AS USER HAS JOINED NEW GROUP
              db.execute(
                "SELECT groupname FROM users WHERE email = ?;",
                [email],
                (err: Error, results: any) => {
                  if (err) return next(new ErrorHandler(err.message, 500));
                  else {
                    let group = results[0].groupname as string;
                    if (group === null) group = `${id}`;
                    else group = group.concat(`,${id}`);
                    // @ts-expect-error
                    db.execute(
                      "UPDATE users SET groupname = ? WHERE email = ?;",
                      [group, email],
                      (err: Error, results: any) => {
                        if (err)
                          return next(new ErrorHandler(err.message, 500));
                        else res.status(201).send("User added!");
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    }
  );
};

export const getGroupHandler = async (req: any, res: any, next: any) => {
  const email = req.body.email as string;

  // @ts-expect-error
  await db.execute(
    "SELECT groupname FROM users WHERE email = ?;",
    [email],
    (err: Error, results: any) => {
      if (err) {
        console.log(err);
        return next(new ErrorHandler(err.message, 500));
      } else {
        const groupIds = results[0].groupname.split(",") as Array<string>;

        let groupDetailsJSON = [] as Array<{ id: string; groupname: string }>;
        // GETTING GROUPNAME BY GROUPID TO SEND THE Array<groupnames> TO FRONTEND
        for (let i = 0; i < groupIds.length; i++) {
          let groupId = groupIds[i];
          // @ts-expect-error
          db.execute(
            "SELECT groupname FROM prattlemegroups WHERE id = ?;",
            [groupId],
            (err: Error, results: any) => {
              if (err) return next(new ErrorHandler(err.message, 500));
              else {
                let gName = results[0].groupname as string;
                groupDetailsJSON.push({ id: `${groupId}`, groupname: `${gName}` });
                if (i == groupIds.length - 1) res.status(200).json(groupDetailsJSON);
              }
            }
          );
        }
      }
    }
  );
};
