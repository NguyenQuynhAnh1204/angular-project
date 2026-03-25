import { Component } from '@angular/core';
import { employees, IEmployee } from './employee';
import { CommonModule } from '@angular/common';
import { BravoTabPanelComponent, BravoTabsComponent } from 'src/app/lib';
import { EmployeeCardComponent } from './component';

@Component({
    standalone: true,
    selector: 'employee',
    templateUrl: './employee.component.html',
    styleUrls: ["./employee.component.scss"],
    imports: [CommonModule, BravoTabsComponent, BravoTabPanelComponent, EmployeeCardComponent]
})

export class EmployeeComponent {
    private employeeList = employees;
    get employees() : IEmployee[] {
        return this.employeeList;
    }
    set employees(pEmployees: IEmployee[]) {
        this.employeeList = pEmployees;
    }
}