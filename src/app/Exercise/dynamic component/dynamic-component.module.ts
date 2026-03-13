import { NgModule } from '@angular/core';

import { DynamicComponent } from './dynamic-component.component';
import { CompoOneComponent } from './dynamic-one.component';
import { CompoTwoComponent } from './dynamic-two.component';
import { DynamicDirective } from './dynamic.directive';

@NgModule({
    imports: [],
    exports: [DynamicComponent],
    declarations: [DynamicComponent, CompoOneComponent, CompoTwoComponent, DynamicDirective],
    providers: [],
})
export class DynamicModule {

}
