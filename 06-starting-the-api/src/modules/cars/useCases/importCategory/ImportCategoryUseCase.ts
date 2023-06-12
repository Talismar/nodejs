// eslint-disable-next-line import/no-extraneous-dependencies
import { parse } from "csv-parse";
import fs from "node:fs";

import { ICategoryRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}

export class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoryRepository) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      console.log(file);

      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];

      const parseFile = parse();

      stream.pipe(parseFile);

      parseFile.on("data", async (line) => {
        const [name, description] = line;
        categories.push({
          name,
          description,
        });
      });

      parseFile.on("end", () => {
        fs.promises.unlink(file.path);
        return resolve(categories);
      });
      parseFile.on("error", (err) => {
        return reject(err);
      });
    });
  }

  async execute(file: Express.Multer.File) {
    const categories = await this.loadCategories(file);

    categories.map(async (category) => {
      const { name, description } = category;
      const existCategory = this.categoriesRepository.findByName(name);

      if (!existCategory) {
        this.categoriesRepository.create({
          name,
          description,
        });
      }
    });
    console.log(categories);
  }
}
