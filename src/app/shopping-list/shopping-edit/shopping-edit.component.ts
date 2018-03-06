import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {IngredientModel} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy
{
  @ViewChild('updateType') updateType: ElementRef;
  @ViewChild('f') form: NgForm;

  private subscription: Subscription;
  editMode = false;
  private editedItemIndex: number;
  private editedItem: IngredientModel;

  constructor(private shoppingListService: ShoppingListService)
  {
  }

  onShoppingListChange(form: NgForm)
  {
    const value = form.value;
    this.shoppingListService.updateShoppingList({
      type: this.updateType.nativeElement.value,
      ingredient: new IngredientModel(value.name, value.amount)
    });
    this.editMode = false;
    this.form.reset();
  }

  onClear()
  {
    this.form.reset();
    this.editMode = false;
  }

  ngOnInit()
  {
    this.subscription = this//
      .shoppingListService.startedEditingSubject
      .subscribe(
        (index: number) => {
          this.editMode = true;
          this.editedItemIndex = index;
          this.editedItem = this.shoppingListService.getIngredients()[index];
          this.form.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        });
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }
}
