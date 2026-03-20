import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { ITablePanel } from './bravo-panel.type';
import { ColumnType, RowType } from './bravo-panel.until';
import { BravoTextBoxComponent } from '../bravo-text-box';

@Component({
    standalone: true,
    selector: 'bravo-panel',
    templateUrl: './bravo-panel.component.html',
    styleUrls: ["./bravo-panel.component.scss"],
    imports: [CommonModule],
    providers: []
})

export class BravoPanelComponent {

    public elRef = inject(ElementRef);

    // config layout
    private _configLayout!: ITablePanel;
    @Input('config')
    public get configLayout() {
        return this._configLayout;
    }
    public set configLayout(pConfig) {
        if(!pConfig) return;
        this._configLayout = pConfig;
        this._setupGridLayout();
        this._addPanel(pConfig, this.containerRef);
    }
    
    // container ref
    private _containerRef!: ViewContainerRef;
    @ViewChild("container", {read: ViewContainerRef, static: true})
    public get containerRef() {
        return this._containerRef;
    }
    public set containerRef(pContainerRef) {
        this._containerRef = pContainerRef;
    }
 
    // add grid item = text box
    private _addPanel(pConfig: ITablePanel, pContainerRef: ViewContainerRef) {   
        pContainerRef.clear();
        pConfig.controls.forEach((item) => {
            const { row, column, rowsSpan, columnsSpan } = item.control;
            const rowPart = rowsSpan ? `span ${rowsSpan}` : row;
            const colPart = columnsSpan ? `span ${columnsSpan}` : column;
            if(!item.child) {
                const panelItem = pContainerRef.createComponent(BravoTextBoxComponent);
                panelItem.instance.label = item.control.label;
                Object.assign(panelItem.instance, item.control.style);
                panelItem.location.nativeElement.style.gridArea = `${rowPart} / ${colPart}`;
            }
            else {
                const panel = pContainerRef.createComponent(BravoPanelComponent);
                Object.assign(panel.instance.elRef.nativeElement.style, item.control.style);
                panel.instance.configLayout = item.child;
                
                panel.location.nativeElement.style.gridArea =  `${rowPart} / ${colPart}`;
            }
        })
    }

    // setup grid layout
    private _setupGridLayout() {
        const template = this._handleGridTemplate();
        this.elRef.nativeElement.style.gridTemplateColumns = template.templateColumns;
        this.elRef.nativeElement.style.gridTemplateRows = template.templateRows;
    }

    // lấy số lượng của row columns --> vẽ lền grid
    private _handleGridTemplate() {
        const { rows, columns } = this.configLayout;

        const buildTemplate = (items: any[], Type: any) =>
            items.map(item => new Type(item.value, item.size).toString()).join(" ");

        return {
            templateRows: buildTemplate(rows, RowType),
            templateColumns: buildTemplate(columns, ColumnType)
        };
    }

} 
