import {IngredientModel} from '../shared/ingredient.model';
import {EventEmitter} from '@angular/core';

export class ShoppingListService
{
  private ingredients: IngredientModel[] = [
    new IngredientModel('Apple', 5),
    new IngredientModel('Banana', 10)
  ];

  ingredientsChangeEventEmitter = new EventEmitter<IngredientModel[]>();

  getIngredients(): IngredientModel[]
  {
    return this.ingredients.slice();
  }

  updateShoppingList(shoppingListUpdate)
  {
    const updateIngredient = shoppingListUpdate.ingredient;

    if (updateIngredient.name.length > 0 && updateIngredient.amount)
    {
      const existingIngredient = this.ingredients.find(i => i.name === updateIngredient.name);

      if (shoppingListUpdate.type === 'add')
      {
        if (existingIngredient)
        {
          existingIngredient.amount = +existingIngredient.amount + +updateIngredient.amount;
        }
        else
        {
          this.ingredients.push(updateIngredient);
        }
      }

      if (shoppingListUpdate.type === 'delete')
      {
        if (existingIngredient)
        {
          existingIngredient.amount = +existingIngredient.amount - +updateIngredient.amount;

          if (existingIngredient.amount <= 0)
          {
            const index = this.ingredients.findIndex(i => i.name === updateIngredient.name);

            this.ingredients.splice(index, 1);
          }
        }
      }

      this.ingredientsChangeEventEmitter.emit(this.getIngredients());
    }
  }

  addIngredients(ingredients: IngredientModel[])
  {
    ingredients.forEach(i => this.updateShoppingList({
      type: 'add',
      ingredient: new IngredientModel(i.name, i.amount)
    }));
  }
}
