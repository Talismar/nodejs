import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

const categoriesRespositories = CategoriesRepository.getInstance();
const importCategoryUseCase = new ImportCategoryUseCase(
  categoriesRespositories
);
const importCategoryController = new ImportCategoryController(
  importCategoryUseCase
);

export { importCategoryController };
