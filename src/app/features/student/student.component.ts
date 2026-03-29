import { Component } from '@angular/core';
import { StudentTableComponent } from './component';

@Component({
    selector: 'student',
    templateUrl: './student.component.html',
    styleUrls: ["./student.component.scss"],
    imports: [StudentTableComponent]
})

export class StudentComponent {}