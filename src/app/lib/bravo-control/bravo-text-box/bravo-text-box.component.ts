import { CommonModule } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import { FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BravoControlBaseComponent } from '../bravo-control-base';
import { BravoControlDirective } from '../bravo-control-directive';

@Component({
    selector: 'br-text-box',
    templateUrl: './bravo-text-box.component.html',
    styleUrls: ["./bravo-text-box.component.scss"],
    imports: [CommonModule, FormsModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => BravoTextBoxComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(()=> BravoTextBoxComponent),
            multi: true
        }
    ],
    hostDirectives: [{
        directive: BravoControlDirective,
        inputs: ["formControl"]
    }]
})

export class BravoTextBoxComponent extends  BravoControlBaseComponent{

    public handleOnChange(pEvent: Event) {
        const input = pEvent.target as HTMLInputElement;
        const value  = input.value;
        this.updateValue(value);
    }
}