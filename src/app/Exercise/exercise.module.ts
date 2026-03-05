import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { BravoButtonComponent, BravoItemComponent, ExampleComponent, HighlightDirective, SizerComponent, StarPipe } from './example';
import { ExerciseComponent } from './exercise.component';

@NgModule({
    imports: [CommonModule],
    exports: [ExerciseComponent],
    declarations: [ExerciseComponent, StarPipe,
        HighlightDirective, BravoButtonComponent, BravoItemComponent,
        SizerComponent, ExampleComponent
    ]
})
export class ExerciseModule {
 }
