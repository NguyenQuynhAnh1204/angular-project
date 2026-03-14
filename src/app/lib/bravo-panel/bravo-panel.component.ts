import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { BravoControlBaseModule } from '../bravo-control-base';
import { BravoTextBoxComponent } from '../bravo-control-base/bravo-text-box';
import { IConfigLayOut } from './bravo-config-layout';

@Component({
    standalone: true,
    selector: 'bravo-panel',
    templateUrl: './bravo-panel.component.html',
    styleUrls: ["./bravo-panel.component.scss"],
    imports: [CommonModule, BravoControlBaseModule]
})

export class BravoPanelComponent implements AfterViewInit {

    private _configLayout!: IConfigLayOut[];
    @Input('config')
    public get config() {
        return this._configLayout;
    }
    public set config(pConfig) {
        this._configLayout = pConfig;
    }

    private _containerRef!: ViewContainerRef;
    @ViewChild("container", {read: ViewContainerRef})
    public get containerRef() {
        return this._containerRef;
    }
    public set containerRef(pContainerRef) {
        this._containerRef = pContainerRef;
    }

    public ngAfterViewInit() {
        this._addPanel();
    }

    
    private _addPanel() {   
        this._configLayout.forEach((item) => {
            const panelItem = this.containerRef.createComponent(BravoTextBoxComponent)
            panelItem.instance.label = item.label;
            Object.assign(panelItem.instance, item.style);
            panelItem.location.nativeElement.style.gridArea = `${item.row} / ${item.column}`;
        })
    }

} 