import { Component } from '@angular/core';
import { CustomFormComponent, FormBuilderComponent, ReactiveFormComponent } from './component';

@Component({
    selector: 'bravo-form',
    templateUrl: './form.component.html',
    styleUrls: ["./form.component.scss"],
    imports: [ReactiveFormComponent,
        // FormBuilderComponent, CustomFormComponent, 
    ]
})

export class BravoFormComponent {
    
} 