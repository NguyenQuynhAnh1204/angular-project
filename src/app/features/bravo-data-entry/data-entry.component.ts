import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { BravoPanelComponent, toCamelCase } from 'src/app/lib';
import { ITablePanel } from 'src/app/lib/bravo-panel/bravo-panel.type';
import { PANEL_CONFIG } from './config-layout';


@Component({
    standalone: true,
    selector: 'data-entry',
    templateUrl: './data-entry.component.html',
    styleUrls: ["./data-entry.component.scss"],
    imports: [BravoPanelComponent, CommonModule, 
        FormsModule, ReactiveFormsModule
    ]
})

export class DataEntryComponent {

    private _forms = new FormGroup({})
    public get forms() {
        return this._forms;
    }
    public set forms(pForm) {
        this._forms = pForm;
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
        this.forms = this._handleBuildForm(this.layout);
    }

    private _handleBuildForm(pConfig: ITablePanel) {
        const group: { [key: string]: any } = {}
        pConfig.controls.forEach((item) => {
            if(!item.child) {
                const controlName = toCamelCase(item.control.label);
                group[controlName] = new FormControl('', { nonNullable: true });
            } else {
                Object.assign(group, this._handleBuildForm(item.child).controls);
            }
        })
        return new FormGroup(group);
    }

    public onSubmit() {
        this.forms.markAllAsTouched();
        if(this.forms.invalid) {
            console.log(this.forms.status)
            return;
        }
        this.forms.reset();
    }
}
