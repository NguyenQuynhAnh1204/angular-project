import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BravoControlBaseComponent } from '../bravo-control-base';


@Component({
    selector: 'br-text-box',
    templateUrl: './bravo-text-box.component.html',
    styleUrls: ["./bravo-text-box.component.scss"],
    imports: [CommonModule, FormsModule]
})

export class BravoTextBoxComponent extends BravoControlBaseComponent {
    public handleOnChange(pEvent: Event) {
        const input = pEvent.target as HTMLInputElement;
        const value  = input.value;
        this.updateValue(value);
    }
}