import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { products } from './products';

@Component({
    selector: 'list-product',
    templateUrl: 'list-product.component.html',
    styleUrls: ['list-product.component.scss']
})

export class ListProductComponent implements OnInit {

    public products = products;

    public searchName = 'Sản phẩm';

    public isFilter = false;

    constructor() { }

    ngOnInit() { }

    buy(productId: number) {
        console.log(productId);
    }

    filter() {
        this.isFilter = !this.isFilter;
    }
}