import { Component, forwardRef } from '@angular/core';
import { BravoControlBaseComponent } from '../bravo-control-base';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BravoControlNameDirective } from '../bravo-control-directive';

@Component({
    standalone: true,
    selector: 'br-control-number',
    templateUrl: './bravo-control-number.component.html',
    styleUrls: ["./bravo-control-number.component.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => BravoControlNumberComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => BravoControlNumberComponent),
            multi: true
        }
    ],
    hostDirectives: [{
        directive: BravoControlNameDirective,
        inputs: ["formControlName"]
    }]
})

export class BravoControlNumberComponent extends BravoControlBaseComponent{
    public handleOnChange(pEvent: Event) {
        const input = pEvent.target as HTMLInputElement;
        const value  = input.value;
        this.updateValue(value);
    }
}