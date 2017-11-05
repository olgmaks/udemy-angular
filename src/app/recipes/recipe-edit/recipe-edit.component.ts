import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {isUndefined} from 'util';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit
{

  editMode = false;

  constructor(private activeRoute: ActivatedRoute)
  {
  }

  ngOnInit()
  {
    this.activeRoute.params.subscribe(params => {

      this.editMode = !isUndefined(params['id']);
    });
  }
}
