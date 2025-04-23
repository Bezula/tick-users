import { Request, Response, Router } from "express";
import { body, param } from "express-validator";
import { Group } from "../model/group";
import { User } from "../model/user";
import { BadRequestError, requireAuth } from "@ultickets/common";

const router = Router();

router.post(
  "/api/users/group/create",
  [body("name").notEmpty().isString()],
  requireAuth,
  async (req: Request, res: Response) => {
    const { name } = req.body;
    const existingGroup = await Group.find({ name });
    if (existingGroup.length > 0) {
      throw new BadRequestError("Group already exists");
    }

    const group = Group.build({
      name,
    });

    await group.save();

    res.send({ group });
  }
);

router.put(
  "/api/users/group/:groupId/member/:memberId/add",
  [param("groupId").notEmpty(), param("memberId").notEmpty()],
  requireAuth,
  async (req: Request, res: Response) => {
    const { groupId, memberId } = req.params;
    const user = await User.findById(memberId);
    const group = await Group.findById(groupId);

    if (!user) {
      throw new BadRequestError("User not found");
    }

    if (!group) {
      throw new BadRequestError("Group not found");
    }

    if (user.group) {
      throw new BadRequestError("User already in a group");
    }

    group.members.push(user.id);

    user.group = group.id;
    await user.save();
    await group.save();

    res.send({ group });
  }
);

router.get(
  "/api/users/group",
  requireAuth,
  async (req: Request, res: Response) => {
    const groups = await Group.find({}).populate("members");

    res.send({ groups });
  }
);

export { router as groupRouter };
