import { NgModule } from '@angular/core';

import { BravoControlBaseComponent } from './bravo-control-base.component';
import { BravoTextBoxComponent } from './bravo-text-box';


@NgModule({
    imports: [],
    exports: [BravoTextBoxComponent],
    declarations: [BravoControlBaseComponent, BravoTextBoxComponent],
    providers: [],
})
export class BravoControlBaseModule { }
