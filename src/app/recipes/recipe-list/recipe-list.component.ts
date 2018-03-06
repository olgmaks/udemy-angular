import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecipeModel} from '../recipe.model';
import {RecipesService} from '../recipes.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy
{
  recipes: RecipeModel[];
  recipesChangedSubscription: Subscription;

  constructor(private recipeService: RecipesService)
  {
  }

  ngOnInit()
  {
    this.recipes = this.recipeService.getRecipes();
    this.recipesChangedSubscription = this.recipeService.recipesChangedSubject
                                          .subscribe((recipes: RecipeModel[]) => {
                                            this.recipes = recipes;
                                          });
  }

  ngOnDestroy()
  {
    this.recipesChangedSubscription.unsubscribe();
  }
}
