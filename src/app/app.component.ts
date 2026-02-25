import { AfterViewInit, Component, Inject, inject, Injectable, InjectionToken } from '@angular/core';
import 'reflect-metadata';
import { IDataBaseService, IGeneralService, IUser } from './Exercise/Dependency-injection/interface-service';
import { UserRepositoryMock } from './Exercise/Dependency-injection/user-repo';


export interface IMessageService {
  getMessages(): string;
}

export const MESSAGE_SERVICE = new InjectionToken<IMessageService>('MESSAGE_SERVICE');

export const USER_REPO = new InjectionToken<IDataBaseService<IUser>>('USER_REPO');

export const USER_SERVICE = new InjectionToken<IGeneralService>('USER_SERVICE');

export const MESS_VALUE_DEFAULT = new InjectionToken<string>("MESS_DEFAULT");

export const STATE_VALUE_DEFAULT = new InjectionToken<boolean>("STATE_VALUE_DEFAULT");

@Injectable()
export class LocalMessageService implements IMessageService {
  public getMessages() {
    return 'Hello';
  }
}

// @Injectable()
// export class ApiMessageService implements IMessageService {
//   public getMessages() {
//     return 'Response API';
//   }
// }
@Injectable({
  providedIn: "root"
})
export class CounterService {
  private _counter = 0;
  public get counter() {
    return this._counter;
  }
  public set counter(pCount) {
    this._counter = pCount;
  }

  public increase() {
    this.counter++;
  }

  public decrease() {
    this.counter--;
  }

  public getCounter() {
    return this.counter;
  }

}

const stateGlobal = true;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    {
      provide: USER_REPO,
      useClass: UserRepositoryMock
    },
    {
      provide:  MESS_VALUE_DEFAULT,
      useValue: "message default"
    },
    {
      provide: STATE_VALUE_DEFAULT,
      useValue: stateGlobal
    }
  ]
})
export class AppComponent {
  public userList: IUser[] | undefined;
  // constructor(@Inject(MESSAGE_SERVICE)public  messageService: IMessageService) {}
  constructor(
    @Inject(USER_REPO)public  messageService: IDataBaseService<IUser>, 
    @Inject( MESS_VALUE_DEFAULT) public messDefault: string, 
    @Inject(STATE_VALUE_DEFAULT) public stateDefault: boolean
  ) {
    this.userList = this.messageService.getAll();

    if(this.stateDefault) {
      console.log(this.messDefault)
      console.log(this.stateDefault)
    } else {
      console.log('nothings')
    }
  }


}



@Component({
  selector: 'btn-counter',
  template: `
    <button (click)="handleOnClickIncrease()">Tăng</button>
    <button (click)="handleOnClickDecrease()">Giảm</button>
  `
})
export class CounterButtonsComponent {
  private _countService = inject(CounterService);

  public handleOnClickIncrease() {
    this._countService.increase();
  }

  public handleOnClickDecrease() {
    this._countService.decrease();
  }
}


@Component({
  selector: 'btn-display',
  template: `
    <span>{{count}}</span>
  `
})
export class CounterDisplayComponent {
  private _countService = inject(CounterService);
  public get count() {
    return this._countService.getCounter();
  }
}