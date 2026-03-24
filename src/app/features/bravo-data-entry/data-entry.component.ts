import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { BravoPanelComponent } from 'src/app/lib';
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

    private _forms = new FormGroup(
        {},
        {validators: [isNumber, isText]}
    )
    public get forms() {
        return this._forms;
    }
    public set forms(pForm) {
        this._forms = pForm;
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
                group[controlName] = new FormControl('');
            } else {
                Object.assign(group, this._handleBuildForm(item.child).controls);
            }
        })
        return new FormGroup(group);
    }

    public onSubmit() {
        this.forms.markAllAsTouched();
        if(this.forms.invalid) {
            return;
        }
        console.log(this.forms.value);
        this.forms.reset();
    }
}


function toCamelCase(pString: string) {
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


function isNumber(pGroup: AbstractControl) {
    // console.log(pGroup);
    return null;
}


function isText(pGroup: AbstractControl) {
    // console.log(pGroup);
    return null;
}
