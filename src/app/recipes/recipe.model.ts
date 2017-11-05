import {IngredientModel} from '../shared/ingredient.model';

export class RecipeModel
{
  id: number;
  name: string;
  description: string;
  imagePath: string;
  ingredients: IngredientModel[];

  constructor(id: number, name: string, description: string, imagePath: string, ingredients: IngredientModel[])
  {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}
