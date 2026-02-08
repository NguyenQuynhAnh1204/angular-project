import { Component, OnInit } from '@angular/core';
import { employees, IEmployee } from './employee';

@Component({
    selector: 'employee',
    templateUrl: './employee.component.html'
})

export class EmployeeComponent implements OnInit {

    private employeeList = employees;
    get employees() : IEmployee[] {
        return this.employeeList;
    }
    set employees(pEmployees: IEmployee[]) {
        this.employeeList = pEmployees;
    }
   

    constructor() { }

    ngOnInit() { }
}