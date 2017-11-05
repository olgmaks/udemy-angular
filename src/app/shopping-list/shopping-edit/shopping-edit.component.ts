import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {IngredientModel} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit
{
  @ViewChild('nameInput') nameInput;
  @ViewChild('amountInput') amountInput;

  constructor(private shoppingListService: ShoppingListService)
  {
  }

  ngOnInit()
  {
  }

  onUpdate(type: string)
  {
    const nameInputElement = this.nameInput.nativeElement;
    const amountInputElement = this.amountInput.nativeElement;

    if (type === 'clear')
    {
      nameInputElement.value = '';
      amountInputElement.value = '';
    }
    else
    {
      this.shoppingListService.updateShoppingList({
        type: type,
        ingredient: new IngredientModel(nameInputElement.value, amountInputElement.value)
      });
    }
  }
}
