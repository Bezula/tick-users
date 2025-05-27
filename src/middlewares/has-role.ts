import { NextFunction, Request, Response } from "express";
import { Role } from "../model/role";
import { User } from "../model/user";
import { NotFoundError } from "@ultickets/common";

export const hasRole = (role: Role) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // FIXME: support roles that is attached into logged user by jwt, propably role microservice is required
    const user = await User.findById(req.params.memberId);

    if (!user) {
      console.log(role);
      throw new NotFoundError();
    }

    // if (user.role !== role) {
    //   throw new ForbiddenError(`User does not have the required role: ${role}`);
    // }

    next();
  };
};
