import { NgModule } from '@angular/core';

import { BravoButtonComponent, BravoItemComponent, ExampleComponent, HighlightDirective, SizerComponent, StarPipe } from './example';
import { ChildComponent, ExerciseComponent } from './exercise.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { UserRepositoryMock } from './DI/Dependency-injection/user-repo';

@NgModule({
    imports: [CommonModule],
    exports: [ExerciseComponent],
    declarations: [ExerciseComponent, StarPipe,
        HighlightDirective, BravoButtonComponent, BravoItemComponent,
        SizerComponent, ExampleComponent,
        ChildComponent
    ]
})
export class ExerciseModule {
 }
