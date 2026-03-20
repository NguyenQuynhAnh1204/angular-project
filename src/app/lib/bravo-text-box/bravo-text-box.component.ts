import { Component } from '@angular/core';
import { BravoControlBaseComponent } from '../bravo-control-base';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
    standalone: true,
    selector: 'br-text-box',
    templateUrl: './bravo-text-box.component.html',
    styleUrls: ["./bravo-text-box.component.scss"],
    imports: [CommonModule, FormsModule]
})

export class BravoTextBoxComponent extends BravoControlBaseComponent {
    
}