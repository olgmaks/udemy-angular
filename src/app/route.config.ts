import {Routes} from '@angular/router';
import {RecipesComponent} from './recipes/recipes.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';

export const appRoutes: Routes = [
  {path: '', component: RecipesComponent},
  {path: 'recipes', component: RecipesComponent},
  {path: 'shopping-list', component: ShoppingListComponent}
];
