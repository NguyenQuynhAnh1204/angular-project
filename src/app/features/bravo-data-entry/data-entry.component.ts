import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BravoPanelComponent, toCamelCase } from 'src/app/lib';
import { ITablePanel } from 'src/app/lib/bravo-panel/bravo-panel.type';
import { PANEL_CONFIG } from './config-layout';


@Component({
    selector: 'data-entry',
    templateUrl: './data-entry.component.html',
    styleUrls: ["./data-entry.component.scss"],
    imports: [BravoPanelComponent, CommonModule,
        FormsModule, ReactiveFormsModule
    ]
})

export class DataEntryComponent {

    private _formContainer = new FormGroup({})
    public get formContainer() {
        return this._formContainer;
    }
    public set formContainer(pForm) {
        this._formContainer = pForm;
    }

    private _invalid = true;
    public get invalid() {
        return this._invalid;
    }
    public set invalid(pStatus) {
        this._invalid = pStatus;
    }
    
    // config layout input
    private _configLayout!: ITablePanel[];
    public get configLayout() {
        return this._configLayout;
    }
    public set configLayout(value) {
        this._configLayout = value;
    }

    // select layout
    private _layout!: ITablePanel;
    public get layout() {
        return this._layout;
    }
    public set layout(pLayout) {
        this._layout = pLayout;
        this.formContainer = this._buildForm(pLayout);
    }

    // labels
    private _labels: string[] = [];
    public get labels() {
        return this._labels;
    }
    public set labels(pLabels) {
        this._labels = pLabels;
    }

    public constructor() {
        this.configLayout = PANEL_CONFIG;
        if(this.configLayout.length > 0) {
            this.layout = this.configLayout[0];
        }
        this.formContainer.statusChanges.subscribe((pVal) => {
            if(pVal != 'INVALID') {
                this.invalid = false;
                return;
            };
            this.invalid = true
        })
        
    }

    private _buildForm(pConfig: ITablePanel) {
        const group: { [key: string]: any } = {}
        pConfig.controls.forEach((item) => {
            const controlName = toCamelCase(item.control.label);
            if(!item.child) {
                group[controlName] = new FormControl('', { nonNullable: true });
            } else {
                Object.assign(group, this._buildForm(item.child).controls);
            }
        })
        return new FormGroup(group);
    }

    public onSubmit() {
        this.formContainer.markAllAsTouched();
        if(this.formContainer.invalid) {
            console.log(this.formContainer.status)
            return;
        }
        console.log(this.formContainer.value)
        this.formContainer.reset();
    }
}
