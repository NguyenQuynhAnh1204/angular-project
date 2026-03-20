import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BravoPanelComponent } from 'src/app/lib';
import { ITablePanel } from 'src/app/lib/bravo-panel/bravo-panel.type';
import { PANEL_CONFIG } from './config-layout';
import { CommonModule } from '@angular/common';


@Component({
    standalone: true,
    selector: 'data-entry',
    templateUrl: './data-entry.component.html',
    styleUrls: ["./data-entry.component.scss"],
    imports: [BravoPanelComponent, CommonModule, 
        FormsModule
    ]
})

export class DataEntryComponent {

    private _configLayout!: ITablePanel[];
    public get configLayout() {
        return this._configLayout;
    }
    public set configLayout(value) {
        this._configLayout = value;
    }

    private _layout!: ITablePanel;
    public get layout() {
        return this._layout;
    }
    public set layout(pLayout) {
        this._layout = pLayout;
    }

    constructor() {
        this.configLayout = PANEL_CONFIG;
        if(this.configLayout.length > 0) {
            this.layout = this.configLayout[0];
        }
    }
}