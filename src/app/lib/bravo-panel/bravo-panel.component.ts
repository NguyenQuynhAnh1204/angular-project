import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { BravoControlBaseModule } from '../bravo-control-base';
import { BravoTextBoxComponent } from '../bravo-control-base/bravo-text-box';
import { ITablePanel } from './bravo-panel.type';
import { ColumnType, RowType } from './bravo-panel.until';

@Component({
    standalone: true,
    selector: 'bravo-panel',
    templateUrl: './bravo-panel.component.html',
    styleUrls: ["./bravo-panel.component.scss"],
    imports: [CommonModule, BravoControlBaseModule],
    providers: []
})

export class BravoPanelComponent implements AfterViewInit {

    public elRef = inject(ElementRef);

    // config layout
    private _configLayout!: ITablePanel;
    @Input('config')
    public get configLayout() {
        return this._configLayout;
    }
    public set configLayout(pConfig) {
        this._configLayout = pConfig;
    }
    
    // container ref
    private _containerRef!: ViewContainerRef;
    @ViewChild("container", {read: ViewContainerRef})
    public get containerRef() {
        return this._containerRef;
    }
    public set containerRef(pContainerRef) {
        this._containerRef = pContainerRef;
    }

    public ngAfterViewInit() {
        this._setupGridLayout();
        this._addPanel(this.configLayout, this.containerRef);
    }
 
    // add grid item = text box
    private _addPanel(pConfig: ITablePanel, pContainerRef: ViewContainerRef) {   
        pConfig.controls.forEach((item) => {
            if(!item.child) {
                const panelItem = pContainerRef.createComponent(BravoTextBoxComponent);
                panelItem.instance.label = item.control.label;
                Object.assign(panelItem.instance, item.control.style);
                panelItem.location.nativeElement.style.gridArea = `${item.control.row} / ${item.control.column}`;
            }
            else {
                const panel = pContainerRef.createComponent(BravoPanelComponent);
                panel.instance.configLayout = item.child;
                panel.location.nativeElement.style.gridArea = `${item.control.row} / ${item.control.column}`;
            }
        })
    }

    // setup grid layout
    private _setupGridLayout() {
        const template = this._handleGridTemplate();
        this.elRef.nativeElement.style.gridTemplateColumns = template.templateColumns;
        this.elRef.nativeElement.style.gridTemplateRows = template.templateRows;
    }



    // lấy row columns
    private _handleGridTemplate() {
        let templateRows: string[] = []; 
        let templateColumns: string[] = []; 
        const {rows, columns} = this.configLayout;
        rows.forEach((item) => {
            let type;
            if(!item.size) {
                type = new RowType(item.value);
            } else {
                type = new RowType(item.value, item.size);
            }
            templateRows.push(type.toString());
        })
        columns.forEach((item) => {
            let type;
            if(!item.size) {
                type = new ColumnType(item.value);
            } else {
                type = new ColumnType(item.value, item.size);
            }
            templateColumns.push(type.toString());
        })
        return {
            templateRows: templateRows.join(" "),
            templateColumns: templateColumns.join(" ")
        }
    }

} 

