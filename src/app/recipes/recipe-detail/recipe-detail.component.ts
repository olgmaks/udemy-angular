import {Component, Input, OnInit} from '@angular/core';
import {RecipeModel} from '../recipe.model';
import {RecipesService} from '../recipes.service';
import {ActivatedRoute, Router, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit
{
  recipe: RecipeModel;

  constructor(private recipeService: RecipesService,
              private activeRoute: ActivatedRoute,
              private router: Router)
  {

  }

  ngOnInit()
  {
    this.activeRoute.params.subscribe(params => {

      const recipeId = params['id'];
      if (recipeId)
      {
        const recipeFound = this.recipeService.findRecipeById(recipeId);
        if (recipeFound)
        {
          this.recipe = recipeFound;
        }
        else
        {
          this.router.navigate(['/not-found']);
        }
      }
    });
  }

  onAddToShoppingList()
  {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onDeleteRecipe()
  {
    this.recipeService.deleteRecipe(this.recipe.id);
    this.router.navigate(['/recipes']);
  }
}
