import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'br-btn-delete',
  template: `<button [style.background]="theme">Click</button>`,
})
export class BravoButtonComponent implements OnInit, OnDestroy, AfterViewInit {
  @Output('onInitialized')
  public initialized$ = new EventEmitter<this>();

  @Input()
  public theme = 'blue';

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.initialized$.emit(this);
  }

  ngOnDestroy(): void {}

  public onClickHost() {}
}

@Component({
  selector: 'br-item',
  template: `<span [style.background]="background">item {{ value }}</span>
    <button (click)="onDelete()">Delete</button>`,
})
export class BravoItemComponent implements OnInit {
  @Input()
  public value = 0;

  @Output('onDelete')
  indexDelete$ = new EventEmitter<number>();

  constructor() {}

  @Input()
  public background = '';

  ngOnInit() {}

  onDelete() {
    this.indexDelete$.emit(this.value);
  }
}

@Component({
  selector: 'exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss'],
})
export class ExerciseComponent implements OnInit, AfterViewInit {
  public static some = '123312';
  private _hostElementRef = inject<ElementRef<HTMLButtonElement>>(ElementRef);
  public items = [1, 2, 3, 4, 5, 6];

  //#region view query

  @ViewChildren('brITem')
  public itemsRef!: QueryList<BravoItemComponent>;

  private _btnDeleteRef: BravoButtonComponent | undefined;
  public get btnDeleteRef() {
    return this._btnDeleteRef;
  }
  @ViewChild('btnDelete')
  public set btnDeleteRef(value) {
    this._btnDeleteRef = value;
  }

  //#endregion view child

  private _isVisible = true;
  @Input()
  public get isVisible() {
    return this._isVisible;
  }
  public set isVisible(value) {
    if (value === this._isVisible) return;
    this._isVisible = value;
  }

  public get hostElement() {
    return this._hostElementRef.nativeElement;
  }

  //events binding
  // dom thuần tuý
  private _renderer2 = inject(Renderer2);

  //#region life cycle

  public ngOnInit(): void {}

  public ngAfterViewInit(): void {
    this.itemsRef.forEach(
      (item) => (item.background = this.getHightLightBackground(item.value)),
    );

    this.itemsRef.changes.subscribe((pItem) => {
      // this.itemsRef.forEach(
      //   (item) => (item.background = this.getHightLightBackground(item.index)),
      // );
      const { last } = this.itemsRef;
      setTimeout(() => {
        last.background = this.getHightLightBackground(last.value);
      });
    });
  }

  //#endregion life cycle

  //detect => event dom
  protected _onClickBtnDelete(
    pEvent: MouseEvent,
    pBtnDelete: HTMLButtonElement,
  ) {
    let event = pEvent;
  }

  protected _onClickBtnToggle() {
    // this.isVisible = !this.isVisible;

    this.items.push(1);
  }

  protected _handleOnInitializedBtnDelete(pPayload: BravoButtonComponent) {
    pPayload.theme = 'red';
  }

  protected getHightLightBackground(pIndex: number) {
    if (pIndex % 2 !== 0) return ' ';
    return 'lightblue';
  }

  onDeleteItem(pValue: number) {
    const index = this.items.indexOf(pValue);
    if (index === -1) return;
    this.items.splice(index, 1);
  }
}

class QueryList1 {
  readonly #changes = new Subject<this>();
  public changes() {
    return this.#changes.asObservable();
  }

  public notifyOnChanges() {
    return this.#changes.next(this);
  }
}
