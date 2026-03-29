import { Component, OnInit } from '@angular/core';
import { BravoButtonComponent } from 'src/app/lib';

@Component({
    selector: 'header',
    templateUrl: 'header.component.html',
    styleUrls: ["header.component.scss"],
    imports: [BravoButtonComponent]
})

export class HeaderComponent {}