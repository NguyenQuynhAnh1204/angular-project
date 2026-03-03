import { Component, inject, OnInit } from '@angular/core';
import { LoggerInformation } from './dependency.service';

@Component({
    selector: 'dependency',
    template: `
        <p>Dependency</p>
    `,
    providers: []
})
export class DependencyComponent  {
    public log1 = inject(LoggerInformation);
    constructor(private log2: LoggerInformation) {
        console.log(this.log1.logger())
        console.log(this.log1 == this.log2);
    }
}