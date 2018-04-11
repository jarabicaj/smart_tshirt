import { Router } from "express";
import * as R from "ramda";

import * as userApi from "../database/models/user/api";
import * as statsApi from "../database/models/stats/api";
import * as valuesApi from "../database/models/values/api";

const apiRouter = db => {
  const router = Router();

  router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  router.get("/users", async (req, res) => {
    const users = await userApi.getAllUsers();
    res.json(
      users.map(user => ({
        id: user._id,
        name: user.name
      }))
    );
  });

  router.get("/users/:id", async (req, res) => {
    const user = await userApi.getUser(req.params.id);
    res.json({
      id: user._id,
      name: user.name
    });
  });

  router.post("/users", async (req, res) => {
    console.log("body", req.body);
    const newUser = await userApi.createNewUser({ name: req.body.name });
    res.json({
      id: newUser._id,
      name: newUser.name
    });
  });

  router.get("/stats/:id", async (req, res) => {
    const stats = await statsApi.getStats(req.params.id);
    res.json(
      R.map(
        stat => ({
          id: stat._id,
          userId: stat.userId,
          from: stat.from,
          to: stat.to,
          values: stat.values
        }),
        stats
      )
    );
  });

  router.get("/values/:id", async (req, res) => {
    const values = await valuesApi.getValues(req.params.id);
    res.json({
      id: values._id,
      data: R.map(
        value => ({
          id: value._id,
          time: value.time,
          value: value.value
        }),
        values.data
      ),
    });
  });

  return router;
};

export default apiRouter;
