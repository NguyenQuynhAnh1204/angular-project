import { Directive, inject, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[dynamic-host]' })
export class DynamicDirective {
    public viewContainerRef = inject(ViewContainerRef);
}