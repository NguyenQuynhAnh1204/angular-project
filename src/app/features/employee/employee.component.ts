import { Component, OnInit } from '@angular/core';
import { employees, IEmployee } from './employee';
import { ITabsProps } from 'src/app/lib/tabs';



const tabsProps : ITabsProps[] = [
    {
        key: 1,
        label: "Tab 1",
        children: 'Content of tab 1',
        icon: 'home'
    },
    {
        key: 2,
        label: "Tab 2",
        children: 'Content of tab 2',
        icon: 'search'
    },
    {
        key: 3,
        label: "Tab 3",
        children: 'Content of tab 3'
    },
]

@Component({
    selector: 'employee',
    templateUrl: './employee.component.html',
    styleUrls: ["./employee.component.scss"],

})

export class EmployeeComponent implements OnInit {
   
    public tabs = tabsProps;

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