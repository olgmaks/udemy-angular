import {RecipeModel} from './recipe.model';
import {EventEmitter, Injectable} from '@angular/core';
import {IngredientModel} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs/Subject';
import {Http} from '@angular/http';

@Injectable()
export class RecipesService
{
  recipesChangedSubject = new Subject<RecipeModel[]>();
  recipeItemSelectedEventEmitter = new EventEmitter<RecipeModel>();

  constructor(private shoppingListService: ShoppingListService,
              private http: Http)
  {
  }

  private recipeList: RecipeModel[] = [
    new RecipeModel(
      1,
      'Test Recipe', 'Test Recipe Description',
      'http://food.fnr.sndimg.com/content/dam/images/food/fullset/2012/2/1/0/WU0202_chili_s3x4.jpg.rend.hgtvcom.616.462.suffix/1486076474733.jpeg',
      [
        new IngredientModel('Mead', 1),
        new IngredientModel('Bread', 2)
      ]
    ),
    new RecipeModel(
      2,
      'French Potato',
      'Fried Potato with a cheese',
      'http://food.fnr.sndimg.com/content/dam/images/food/fullset/2013/6/13/0/YW0301H_twice-baked-potatoes-recipe_s4x3.jpg.rend.hgtvcom.616.462.suffix/1406091903572.jpeg',
      [
        new IngredientModel('Potato', 1),
        new IngredientModel('Cheese', 3)
      ])
  ];

  getRecipes()
  {
    return this.recipeList.slice();
  }

  addIngredientsToShoppingList(ingredients: IngredientModel[])
  {
    this.shoppingListService.addIngredients(ingredients);
  }

  findRecipeById(id: number): RecipeModel
  {
    return this.getRecipes().find(r => +r.id === +id);
  }

  addRecipe(recipe: RecipeModel)
  {
    this.recipeList.push(recipe);
    this.recipesChangedSubject.next(this.recipeList.slice());
  }

  updateRecipe(index: number, newRecipe: RecipeModel)
  {
    this.recipeList[index] = newRecipe;
    this.recipesChangedSubject.next(this.recipeList.slice());
  }

  deleteRecipe(id: number)
  {
    const newRecipeList = [];
    for (const recipe of this.recipeList)
    {
      if (recipe.id !== id)
      {
        newRecipeList.push(recipe);
      }
    }
    this.recipeList = newRecipeList;
    this.recipesChangedSubject.next(this.recipeList.slice());
  }

  updateRecipeList(data: RecipeModel[])
  {
    this.recipeList = data;
    this.recipesChangedSubject.next(this.recipeList.slice());
  }
}

