import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RecipeModel} from '../../recipe.model';
import {RecipesService} from "../../recipes.service";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit
{

  @Input() recipe: RecipeModel;

  constructor(private recipeService: RecipesService)
  {
  }

  ngOnInit()
  {
  }

  onItemSelected()
  {
    this.recipeService.recipeItemSelectedEventEmitter.emit(this.recipe);
  }
}
