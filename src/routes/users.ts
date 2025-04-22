import { Router } from "express";
import { User } from "../model/user";

const router = Router();

router.get("/api/users", async (req, res) => {
  res.send({
    users: await User.find({}).populate("group"),
  });
});

export { router as usersRouter };
