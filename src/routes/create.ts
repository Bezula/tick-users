import { requireAuth } from "@ultickets/common";
import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { User } from "../model/user";
import { Group } from "../model/group";

const router = Router();

router.post(
  "/api/users/create",
  [
    body("firstName").notEmpty().isString(),
    body("lastName").notEmpty().isString(),
    body("age").notEmpty().isNumeric(),
    body("role").notEmpty().isString().isIn(["administrator", "family-member"]),
    body("groupId").notEmpty().isString(),
    body("phone").optional().isString(),
    body("avatarUrl").optional().isString(),
  ],

  requireAuth,
  async (req: Request, res: Response) => {
    const { firstName, lastName, age, role, phone, avatarUrl } = req.body;
    const user = User.build({
      firstName,
      lastName,
      age,
      group: (await Group.build({ name: "First group" }).save()).id,
      role,
      phone,
      avatarUrl,
      email: req?.currentUser?.email ?? "",
    });

    await user.save();

    res.status(201).send({
      user,
    });
  }
);

export { router as createRouter };
