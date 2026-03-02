import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { BravoTabsComponent } from '../bravo-tabs.component';

@Component({
    selector: 'bravo-tab-panel',
    templateUrl: './bravo-tab-panel.component.html',
    styleUrls: ["./bravo-tab-panel.component.scss"]
})

export class BravoTabPanelComponent  {
    private _panelTitle!: string;
    @Input('title')
    public get title() {
        return this._panelTitle!;
    }
    public set title(pTitle) {
        this._panelTitle = pTitle;
    }

    private _panelIcon!: string;
    @Input('icon')
    public get icon() {
        return this._panelIcon;
    }
    public set icon(pIcon) {
        this._panelIcon = pIcon;
    }

    private _panelDisabled = false;
    @Input("disabled")
    public get disabled() {
        return this._panelDisabled;
    }
    public set disabled(pDisabled) {
        this._panelDisabled = pDisabled;
    }

    @ViewChild(TemplateRef) panelContent!: TemplateRef<unknown>;
    constructor(private tabGroup: BravoTabsComponent) {
        this.tabGroup.addTabPanel(this);
    }
}