import { Component, OnInit, Directive, ElementRef, ViewContainerRef, TemplateRef, Input, HostListener, HostBinding } from '@angular/core';
import { EmployeeAvatarComponent } from '../employee-avt';
import { IEmployee } from '../../employee';


@Directive({ selector: '[hideAfter]' })
export class HideAfterDirective implements OnInit {

    @Input('hideAfter') delay = 0;

    @Input('hideAfterThen') placeholder !: TemplateRef<any>;

    constructor(private viewContainerRef: ViewContainerRef, private template: TemplateRef<any>) {
        console.log(this.viewContainerRef);
    }

    ngOnInit() {
        this.viewContainerRef.createEmbeddedView(this.template);
        setTimeout(() => {
            this.viewContainerRef.clear();
            this.viewContainerRef.createEmbeddedView(this.placeholder);
            console.log(this.viewContainerRef);
        }, this.delay)
    }
}


@Component({
    selector: 'employee-card',
    templateUrl: './employee-card.component.html',
    styleUrls: ["./employee-card.component.scss"]
})

export class EmployeeCardComponent implements OnInit {

    private _employee!: IEmployee;

    @Input('employee')
    set employee(pEmployee: IEmployee) {
        this._employee = pEmployee;
    }
    get employee(): IEmployee {
        return this._employee;
    }
    
    constructor() { }

    ngOnInit() { 
    }

    @HostBinding('style.backgroundColor') bg = '';
    
    @HostListener("mouseenter") onMouseEnter() {
        this.bg = '#d5e4f4'
    }
    @HostListener('mouseleave') onMouseLeave() {
        this.bg = ""
    }



}