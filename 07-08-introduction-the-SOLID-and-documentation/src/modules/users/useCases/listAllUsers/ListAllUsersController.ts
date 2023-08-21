import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    const { user_id } = request.headers;
    let users;

    if (typeof user_id === "string") {
      try {
        users = this.listAllUsersUseCase.execute({ user_id });
      } catch (error) {
        return response.status(400).send({ error: error.message });
      }
    }

    return response.status(200).send(users);
  }
}

export { ListAllUsersController };
