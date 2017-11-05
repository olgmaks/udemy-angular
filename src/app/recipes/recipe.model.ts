import {IngredientModel} from '../shared/ingredient.model';

export class RecipeModel
{

  name: string;
  description: string;
  imagePath: string;
  ingredients: IngredientModel[];

  constructor(name: string, description: string, imagePath: string, ingredients: IngredientModel[])
  {
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}
