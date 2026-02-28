import { Component, inject } from '@angular/core';
import { UserRepositoryMock } from './DI/Dependency-injection/user-repo';
import {IDataBaseService, IUser} from "./DI/Dependency-injection/interface-service";


@Component({
    selector: 'exercise',
    templateUrl: './exercise.component.html',
    providers: [UserRepositoryMock]
})

export class ExerciseComponent {
    
}


@Component({
    selector: "child-component",
    template: `
        <p>child component</p>
        `
})
export class ChildComponent {
    public userRepo1 = inject(UserRepositoryMock);
    
    constructor() {
        console.log(this.userRepo1);
    }
}