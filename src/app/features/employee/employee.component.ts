import { Component } from '@angular/core';
import { employees, IEmployee } from './employee';

@Component({
    selector: 'employee',
    templateUrl: './employee.component.html',
    styleUrls: ["./employee.component.scss"]
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