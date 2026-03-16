import { Component } from '@angular/core';
import { BravoPanelComponent } from 'src/app/lib';
import { PANEL_CONFIG } from './config-layout';


@Component({
    standalone: true,
    selector: 'data-entry',
    templateUrl: './data-entry.component.html',
    styleUrls: ["./data-entry.component.scss"],
    imports: [BravoPanelComponent]
})

export class DataEntryComponent {
    public configLayout = PANEL_CONFIG;
}