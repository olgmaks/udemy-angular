import {Component, OnDestroy, OnInit} from '@angular/core';
import {IngredientModel} from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy
{
  ingredients: IngredientModel[];

  private subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService)
  {
  }

  ngOnInit()
  {
    this.ingredients = this.shoppingListService.getIngredients();

    this.subscription = this.shoppingListService.ingredientsChangeSubject
                            .subscribe(ingredients => this.ingredients = ingredients);
  }

  ngOnDestroy(): void
  {
    this.subscription.unsubscribe();
  }

  onEditItem(index: number)
  {
    this.shoppingListService.startedEditingSubject.next(index);
  }
}
