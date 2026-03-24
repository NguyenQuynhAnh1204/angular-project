import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ETypeValidation, IValidation, numberValidator, requiredValidator } from '../bravo-control-base';
import { BravoTextBoxComponent } from '../bravo-text-box';
import { ITablePanel } from './bravo-panel.type';
import { ColumnType, RowType } from './bravo-panel.until';

@Component({
    standalone: true,
    selector: 'bravo-panel',
    templateUrl: './bravo-panel.component.html',
    styleUrls: ["./bravo-panel.component.scss"],
    imports: [CommonModule],
    providers: []
})

export class BravoPanelComponent  {

    public elRef = inject(ElementRef);
    
    private _forms!: FormGroup;
    @Input("form")
    public get forms() {
        return this._forms;
    }
    public set forms(pForms) {
        this._forms = pForms;
    }

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
 
    // add grid item = text box / panel
    private _addPanel(pConfig: ITablePanel, pContainerRef: ViewContainerRef) {   
        pContainerRef.clear();
        pConfig.controls.forEach((item) => {
            const { row, column, rowsSpan, columnsSpan } = item.control;
            const rowPart = rowsSpan ? `span ${rowsSpan}` : row;
            const colPart = columnsSpan ? `span ${columnsSpan}` : column;
            if(!item.child) {
                const panelItem = pContainerRef.createComponent(BravoTextBoxComponent);
                // const panelError = pContainerRef.createEmbeddedView("Lỗi");
                panelItem.instance.label = item.control.label;
                Object.assign(panelItem.instance, item.control.style);
                panelItem.location.nativeElement.style.gridArea = `${rowPart} / ${colPart}`; 
                const control = this.forms?.get(toCamelCase(item.control.label));
                if(control) {                    
                    // Form → UI (giá trị khởi tạo)
                    panelItem.instance.writeValue(control.value);
                    // Form → UI (reactive)
                    // khi setValue/reset từ form->control -> phát ra giá trị thay đổi -> writeValue
                    const sub = control.valueChanges.subscribe(value => {
                        panelItem.instance.writeValue(value);
                    });
                    
                    // UI → Form
                    panelItem.instance.registerOnChange((value: any) => {
                        control.setValue(value);
                    });
                    panelItem.instance.registerOnTouched(() => {
                        control.markAsTouched();
                    });
                    panelItem.onDestroy(() => sub.unsubscribe());
                    
                    panelItem.instance.control = control;
                    if(item.control.validator) {
                        const validator = buildValidator(item.control.validator);
                        control.addValidators(validator);
                        control.updateValueAndValidity();
                    }
                } 
            }
            else {
                const panel = pContainerRef.createComponent(BravoPanelComponent);
                Object.assign(panel.instance.elRef.nativeElement.style, item.control.style);
                panel.instance.forms = this.forms;
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

    // lấy số lượng của row columns --> tạo grid
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


export function buildValidator(pValidator: IValidation | IValidation[]) {
   let validators: any[] = [];
   if(Array.isArray(pValidator)) {
       pValidator.forEach((v) => {
           validators = validators.concat(buildValidator(v))
       });
   } else {
       switch(pValidator.type) {
           case ETypeValidation.NUMBER:
               validators.push(numberValidator);
               break;
           case ETypeValidation.REQUIRED:
               validators.push(requiredValidator);
               break;
       }
   }
   return validators;
}

export function toCamelCase(pString: string) {
    if(pString == '') return "label";
    const noAccent = pString
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .toLowerCase();
    
    const camelCase = noAccent
        .split(/\s+/)
        .map((word, index) =>
        index === 0
            ? word
            : word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join("");
    return camelCase;
}

