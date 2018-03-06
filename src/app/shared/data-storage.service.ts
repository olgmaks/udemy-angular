import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {RecipesService} from '../recipes/recipes.service';
import 'rxjs/add/operator/map';
import {RecipeModel} from '../recipes/recipe.model';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class DataStorageService
{
  static RECIPES_URL = 'https://om-recipe-book.firebaseio.com/recipes.json?auth=';

  constructor(private http: Http,
              private recipeService: RecipesService,
              private authService: AuthService)
  {
  }

  storeRecipes()
  {
    return this.http.put(this.recipesUrl(), this.recipeService.getRecipes());
  }

  fetchRecipes()
  {
    return this.http.get(this.recipesUrl())
               .map((response: Response) => {
                 const recipes: RecipeModel[] = response.json();
                 for (const recipe of recipes)
                 {
                   if (!recipe.ingredients)
                   {
                     recipe.ingredients = [];
                   }
                 }
                 return recipes;
               })
               .subscribe((recipes: RecipeModel[]) => {
                 console.log(recipes);
                 this.recipeService.updateRecipeList(recipes);
               });
  }

  private recipesUrl(): string
  {
    return DataStorageService.RECIPES_URL + this.authService.getToken();
  }
}
