import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {isUndefined} from 'util';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipesService} from '../recipes.service';
import {RecipeModel} from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit
{
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private activeRoute: ActivatedRoute,
              private recipeService: RecipesService,
              private router: Router)
  {
  }

  ngOnInit()
  {
    this.activeRoute.params.subscribe(params => {
      this.id = +params['id'];
      this.editMode = !isUndefined(this.id);
      this.initForm();
    });
  }


  onRecipeFormSubmit()
  {
    const newRecipe = new RecipeModel(
      this.recipeService.getRecipes().length + 1,
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']
    );

    if (this.editMode)
    {
      const foundRecipe = this.recipeService.findRecipeById(this.id);

      if (foundRecipe)
      {
        foundRecipe.name = newRecipe.name;
        foundRecipe.description = newRecipe.description;
        foundRecipe.imagePath = newRecipe.imagePath;
        foundRecipe.ingredients = newRecipe.ingredients;
      }
      else
      {
        this.recipeService.addRecipe(newRecipe);
      }
    }

    this.navigateBack();
  }

  onAddIngredient()
  {
    (<FormArray>this.recipeForm.get('ingredients'))
      .push(new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern('^[1-9]+[0-9]*$')])
      }));
  }

  private initForm()
  {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode)
    {
      const recipe = this.recipeService.findRecipeById(this.id);

      if (recipe)
      {
        recipeName = recipe.name;
        recipeImagePath = recipe.imagePath;
        recipeDescription = recipe.description;

        if (recipe.ingredients)
        {
          for (const recipeIngredient of recipe.ingredients)
          {
            recipeIngredients.push(
              new FormGroup({
                'name': new FormControl(recipeIngredient.name, Validators.required),
                'amount': new FormControl(recipeIngredient.amount, [
                  Validators.required,
                  Validators.pattern('^[1-9]+[0-9]*$')])
              })
            );
          }
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  onCancelEditRecipe()
  {
    this.navigateBack();
  }

  navigateBack()
  {
    this.router.navigate(['../'], {relativeTo: this.activeRoute});
  }

  onDeleteIngredient(index: number)
  {
    (<FormArray> this.recipeForm.get('ingredients')).removeAt(index);
  }
}
