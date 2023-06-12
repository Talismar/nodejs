import { Request, Response } from "express";

import { CreateSpecificationUseCase } from "./CreateEspecificationUseCase";

export class CreateSpecificationController {
  constructor(private createSpecifitationUseCase: CreateSpecificationUseCase) {}

  handle(request: Request, response: Response): Response {
    const { name, description } = request.body;

    this.createSpecifitationUseCase.execute({ name, description });

    return response.status(201).send();
  }
}
