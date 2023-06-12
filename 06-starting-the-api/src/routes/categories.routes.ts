import { Router } from "express";
// eslint-disable-next-line import/no-extraneous-dependencies
import multer from "multer";

import { createCategory } from "../modules/cars/useCases/createCategory";
import { importCategoryController } from "../modules/cars/useCases/importCategory";
import { listCategories } from "../modules/cars/useCases/listCategories";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

categoriesRoutes.post("/", (request, response) => {
  return createCategory.handle(request, response);
});

categoriesRoutes.get("/", (request, response) => {
  return listCategories.handle(request, response);
});

categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
  return importCategoryController.handle(request, response);
});

export { categoriesRoutes };
