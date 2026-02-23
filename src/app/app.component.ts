import { Component } from '@angular/core';
import { UserService } from './Exercise/Dependency-injection/user-service';
import { ServiceLocator } from './Exercise/Service-locator/service-locator';
import { UserRepositoryMock } from './Exercise/Dependency-injection/user-repo';
import { OrderService } from './Exercise/Dependency-injection/order-service';
import { OrderRepositoryMock } from './Exercise/Dependency-injection/order-repo';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() { 
    let locator = ServiceLocator.getLocator();

    const service1 = locator.getService(UserService, UserRepositoryMock);
    const service2 = locator.getService(OrderService, OrderRepositoryMock);
    console.log(service2 === service1);
    console.log(service1.repository.get('1'));
    console.log(service2.repository.get('1'));
  }

}

