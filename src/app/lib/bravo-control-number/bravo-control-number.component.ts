import { Component } from '@angular/core';
import { BravoControlBaseComponent } from '../bravo-control-base';

@Component({
    standalone: true,
    selector: 'br-control-number',
    templateUrl: './bravo-control-number.component.html',
    styleUrls: ["./bravo-control-number.component.scss"]
})

export class BravoControlNumberComponent extends BravoControlBaseComponent{
    public handleOnChange(pEvent: Event) {
        const input = pEvent.target as HTMLInputElement;
        const value  = input.value;
        this.updateValue(value);
    }
}