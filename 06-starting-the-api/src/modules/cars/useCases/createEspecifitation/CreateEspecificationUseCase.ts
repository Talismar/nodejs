import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  constructor(private especificationsRepository: ISpecificationsRepository) {}

  execute({ name, description }: IRequest) {
    const especificationAlreadyExists =
      this.especificationsRepository.findByName(name);

    if (especificationAlreadyExists) {
      throw new Error("Specification already exists.");
    }

    this.especificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
