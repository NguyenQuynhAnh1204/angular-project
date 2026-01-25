import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProduct } from '../list-product/products';

@Component({
    selector: 'product-item',
    templateUrl: 'product-item.component.html',
    styleUrls: ['product-item.component.scss']
})

export class ProductItemComponent implements OnInit {

    @Input() product!: IProduct;

    @Output() buySome = new EventEmitter<number>();

    constructor() { }

    ngOnInit() { }

    buy() {
        this.buySome.emit(this.product.id);
    }

    addCart(productId: number) {
        alert(`add product ${productId} cart`)
    }
}