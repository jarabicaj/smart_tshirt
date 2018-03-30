import { Router } from "express";

import * as userApi from "../database/models/user/api";

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
      name: user.name,
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
  return router;
};

export default apiRouter;
