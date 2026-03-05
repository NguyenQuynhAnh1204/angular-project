import { NgModule } from '@angular/core';

import { DependencyComponent } from './dependency.component';
import { LoggerInformation } from './dependency.service';

@NgModule({
    imports: [],
    exports: [DependencyComponent],
    declarations: [DependencyComponent],
    providers: [LoggerInformation],
})
export class DependencyModule { }
