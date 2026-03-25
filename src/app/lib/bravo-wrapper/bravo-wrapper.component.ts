import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { BravoTextBoxComponent } from '../bravo-text-box';
import { BravoErrorComponent } from '../bravo-error';

@Component({
    standalone: true,
    selector: 'br-wrapper',
    templateUrl: './bravo-wrapper.component.html',
    styleUrls: ["./bravo-wrapper.component.scss"],
    imports: [CommonModule, BravoTextBoxComponent, BravoErrorComponent]
})

export class BravoWrapperComponent  {

    private _config!: string;
    @Input('config')
    public get config() {
        return this._config;
    }
    public set config(pValue) {
        this._config = pValue;
    }
}