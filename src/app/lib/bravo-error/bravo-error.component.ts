import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'br-error',
    templateUrl: './bravo-error.component.html',
    styleUrls: ["./bravo-error.component.scss"],
    imports: [CommonModule]
})

export class BravoErrorComponent {

    private _error!: string;
    @Input('error')
    public get error() {
        return this._error;
    }
    public set error(pVal) {
        this._error = pVal;
    }

}