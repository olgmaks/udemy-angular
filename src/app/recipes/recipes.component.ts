import {Component, OnInit} from '@angular/core';
import {RecipeModel} from './recipe.model';
import {RecipesService} from "./recipes.service";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit
{

  recipeDetail: RecipeModel;

  constructor(private recipeService: RecipesService)
  {
  }

  ngOnInit()
  {
    this.recipeDetail = this.recipeService.getRecipes()[0];

    this.recipeService.recipeItemSelectedEventEmitter
        .subscribe(ri => {
          this.recipeDetail = ri;
        });
  }
}
