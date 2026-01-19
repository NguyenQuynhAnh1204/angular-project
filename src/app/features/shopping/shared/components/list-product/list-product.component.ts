import { Component, OnInit } from '@angular/core';

import { products } from './products';

@Component({
    selector: 'list-product',
    templateUrl: 'list-product.component.html',
    styleUrls: ['list-product.component.scss']
})

export class ListProductComponent implements OnInit {

    public products = products;

    constructor() { }

    ngOnInit() { }
}