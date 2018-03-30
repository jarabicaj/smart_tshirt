import mongoose from "mongoose";
import * as R from "ramda";

import * as userApi from "./models/user/api";
import * as valuesApi from "./models/values/api";
import * as statsApi from "./models/stats/api";

export const init = () => {
  mongoose.connect("mongodb://localhost/test");
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", async () => {
    // we're connected!
    console.log("connected");
    // Testing
    // const user = await userApi.createNewUser({ name: "kek" });
    // console.log("saved user", user);

    // const data = R.range(1, 10).map(second => ({
    //   time: new Date(2018, 4, 30, 10, 10, second),
    //   value: Math.random() * 100,
    // }))
    //
    // const values = await valuesApi.saveValues({
    //   data,
    // })
    // console.log("saved values", values)

    // const stats = await statsApi.saveStats({
    //   userId: new mongoose.Types.ObjectId("5abe7c4bce57b17b3c0982ef"),
    //   from: new Date(2018, 4, 30, 10, 10, 1),
    //   to: new Date(2018, 4, 30, 10, 10, 10),
    //   values: new mongoose.Types.ObjectId("5abe809552fc027b8aefd605")
    // });
    // console.log("saved stats", stats);
  });

  return db;
};
