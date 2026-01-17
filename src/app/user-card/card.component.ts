import { Component, OnInit } from '@angular/core';

import { userList } from './userList';



@Component({
    selector: 'user-card',
    templateUrl: 'card.component.html',
    styleUrls: ['card.component.scss']
})

export class CardComponent implements OnInit {
    
    public width =280;

    public users = userList;

    constructor() {}

    ngOnInit() { }

    onClick(id: number) {
        console.log(id)
    }
}