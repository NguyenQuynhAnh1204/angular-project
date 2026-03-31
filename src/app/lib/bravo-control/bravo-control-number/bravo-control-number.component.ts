import { Component, forwardRef } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BravoControlBaseComponent } from '../bravo-control-base';
import { BravoControlDirective } from '../bravo-control-directive';

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
        directive: BravoControlDirective,
        inputs: ["formControl"]
    }]
})

export class BravoControlNumberComponent extends BravoControlBaseComponent{
    public handleOnChange(pEvent: Event) {
        const input = pEvent.target as HTMLInputElement;
        const value  = input.value;
        this.updateValue(value);
    }
}