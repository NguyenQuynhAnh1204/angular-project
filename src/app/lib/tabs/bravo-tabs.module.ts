import { NgModule } from '@angular/core';

import { BravoTabsComponent } from './bravo-tabs.component';
import { CommonModule } from '@angular/common';
import { BravoTabPanelComponent } from './tab-panel';

@NgModule({
    imports: [CommonModule],
    exports: [BravoTabsComponent, BravoTabPanelComponent],
    declarations: [BravoTabsComponent, BravoTabPanelComponent],
    providers: [],
})
export class BravoTabsModule { }
