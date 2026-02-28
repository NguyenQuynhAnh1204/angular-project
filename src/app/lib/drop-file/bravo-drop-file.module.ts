import { NgModule } from '@angular/core';

import { BravoDropFileComponent } from './bravo-drop-file.component';
import { CommonModule } from '@angular/common';
import { BravoByteTypePipe } from './bravo-file.pipe';

@NgModule({
    imports: [CommonModule],
    exports: [BravoDropFileComponent, BravoByteTypePipe],
    declarations: [BravoDropFileComponent, BravoByteTypePipe],
    providers: [],
})
export class BravoDropFileModule { }
