import { Component, Input } from '@angular/core';

@Component({
    selector: 'component-one',
    template: `
        <p>{{data}}</p>
    `
})

export class CompoOneComponent {
    private _data!: string;
    @Input('data')
    public get data() {
        return this._data;
    }
    public set data(pData) {
        this._data = pData;
    }
}