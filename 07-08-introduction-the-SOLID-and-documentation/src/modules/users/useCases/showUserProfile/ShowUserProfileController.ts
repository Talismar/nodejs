import { Request, Response } from "express";

import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

class ShowUserProfileController {
  constructor(private showUserProfileUseCase: ShowUserProfileUseCase) {}

  handle(request: Request, response: Response): Response {
    const { user_id } = request.params;

    try {
      const userInfo = this.showUserProfileUseCase.execute({ user_id });
      return response.status(200).send(userInfo);
    } catch (error) {
      return response.status(404).send({ error: error.message });
    }
  }
}

export { ShowUserProfileController };
