import { Component, inject } from '@angular/core';
import { UserRepositoryMock } from './Exercise/DI/Dependency-injection/user-repo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
})
export class AppComponent {
  // public userRepo = inject(UserRepositoryMock);
  // constructor() {
  //   console.log(this.userRepo.getAll())
  //  }
}




