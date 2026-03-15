import { Component } from '@angular/core';
import { BravoPanelComponent } from 'src/app/lib';
import { CONFIG_LAYOUT } from './config-layout';

@Component({
    standalone: true,
    selector: 'data-entry',
    templateUrl: './data-entry.component.html',
    styleUrls: ["./data-entry.component.scss"],
    imports: [BravoPanelComponent]
})

export class DataEntryComponent {
    public configLayout = CONFIG_LAYOUT;

    
}