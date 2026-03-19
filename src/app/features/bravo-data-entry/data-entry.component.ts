import { Component } from '@angular/core';
import { BravoPanelComponent } from 'src/app/lib';
import { PANEL_CONFIG } from './config-layout';
import { ITablePanel } from 'src/app/lib/bravo-panel/bravo-panel.type';


@Component({
    standalone: true,
    selector: 'data-entry',
    templateUrl: './data-entry.component.html',
    styleUrls: ["./data-entry.component.scss"],
    imports: [BravoPanelComponent]
})

export class DataEntryComponent {

    private _configLayout!: ITablePanel;
    public get configLayout() {
        return this._configLayout;
    }
    public set configLayout(value) {
        this._configLayout = value;
    }

    constructor() {
        this.configLayout = PANEL_CONFIG;
        
    }
}