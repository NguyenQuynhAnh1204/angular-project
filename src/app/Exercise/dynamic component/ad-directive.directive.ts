import { Directive, inject, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[ad-host]' })
export class AdDirective {
    public viewContainerRef = inject(ViewContainerRef);
}
