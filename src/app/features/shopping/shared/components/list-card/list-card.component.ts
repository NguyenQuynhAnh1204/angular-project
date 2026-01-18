import { Component, Input, OnInit, NgModule } from '@angular/core';

import { userList } from './userList';
import { CardComponent } from '../user-card';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'list-card',
  templateUrl: 'list-card.component.html',
})
export class ListCardComponent implements OnInit {
  public users = userList;

  constructor() {}

  ngOnInit() {}
}
