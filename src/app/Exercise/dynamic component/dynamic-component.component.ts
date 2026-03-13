import { Component, ViewChild } from '@angular/core';
import { CompoOneComponent } from './dynamic-one.component';
import { CompoTwoComponent } from './dynamic-two.component';
import { DynamicDirective } from './dynamic.directive';




@Component({
    selector: 'dynamic-component',
    templateUrl: './dynamic-component.component.html'
})

export class DynamicComponent {
    @ViewChild(DynamicDirective)
    public dynamicHost!: DynamicDirective;

    public addComponentOne() {
        const dynamicRef = this.dynamicHost.viewContainerRef;
        dynamicRef.clear();
        const componentRef = dynamicRef.createComponent(CompoOneComponent);
        componentRef.instance.data = 'This is Component One';
    }
    
    public addComponentTwo() {
        const dynamicRef = this.dynamicHost.viewContainerRef;
        dynamicRef.clear();
        const componentRef = dynamicRef.createComponent(CompoTwoComponent);
        componentRef.instance.data = 'This is Component Two';
    }
}



/**
 * hoặc dùng template variable thay vì dùng directive
 * -> đọc nó dưới dạng viewContainerRef chứ không phải là ElementRef
 */