import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BravoTextBoxComponent } from 'src/app/lib/bravo-control-base/bravo-text-box';



const configData = [
    {
        control: "userName",
        value: "",
        label: "User name",
        required: true,
        style: {
            width: '40rem',
            height: '5rem',
            padding: '10 4',
            margin: '10'
        }
    },
    {
        control: "email",
        value: "",
        label: "Email",
        required: true,
        style: {
            width: '40rem',
            height: '5rem',
            padding: '10 4',
            margin: '10'
        }
    },
    {
        control: "password",
        value: "",
        label: "Password",
        required: true,
        style: {
            width: '40rem',
            height: '5rem',
            padding: '10 4',
            margin: '10'
        }
    },
    {
        control: "confirmPassword",
        value: "",
        label: "Confirm password",
        required: true,
        style: {
            width: '40rem',
            height: '5rem',
            padding: '10 4',
            margin: '10'
        }
    },
    
]

@Component({
    selector: 'dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ["./dynamic-form.component.scss"]
})

export class DynamicFormComponent implements AfterViewInit {


    public form = new FormGroup({})

    private _containerRef!: ViewContainerRef;
    @ViewChild("dynamicForm", {read: ViewContainerRef})
    public get containerRef() {
        return this._containerRef;
    }
    public set containerRef(pContainerRef) {
        this._containerRef = pContainerRef;
    }

    public ngAfterViewInit() {
        this.addControl()
        this._addTexBox()
    }

    public addControl() {
        configData.forEach((control) => {
            this.form.addControl(control.control, new FormControl(control.value, [Validators.required]))
        })
    }

    private _addTexBox() {
        configData.forEach((item) => {
            const container = this.containerRef.createComponent(BravoTextBoxComponent);
            container.instance.width = item.style.width
            container.instance.height = item.style.height
            container.instance.padding = item.style.padding
            container.instance.margin = item.style.margin

        })
    }

}