import {
  AfterViewInit,
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Pipe, PipeTransform,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { Subject } from 'rxjs';

@Pipe({
  name: 'star',
})
export class StarPipe implements PipeTransform {
  transform(value: string): string {
    return `⭐️ ${value} ⭐️`;
  }
}

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
    @Input('appHighlight') highlightColor!: string;
    @Input() defaultColor = '';
    constructor(private el: ElementRef) {
    }
    @HostListener('mouseenter') onMouseEnter() {
      this.highlight(this.highlightColor || this.defaultColor || 'red');
    }

    @HostListener('mouseleave') onMouseLeave() {
      this.highlight(this.highlightColor = '');
    }

    private highlight(color: string) {
      this.el.nativeElement.style.backgroundColor = color;
    }
}

@Component({
  selector: 'br-btn-delete',
  template: `<button [style.background]="theme" (click)='onClickHost()'>Click</button>`,
})
export class BravoButtonComponent implements OnInit, OnDestroy, AfterViewInit {
  @Output('onInitialized')
  public initialized$ = new EventEmitter<this>();

  @Input()
  public theme!: string;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.initialized$.emit(this);
  }

  ngOnDestroy(): void {}

  public onClickHost() {
    this.theme = 'blue'
  }
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
  selector: "app-sizer",
  template: `
    <div>
      <button type="button" (click)="dec()" title="smaller">-</button>
      <button type="button" (click)="inc()" title="bigger">+</button>
      <span [style.font-size.px]="size">FontSize: {{size}}px</span>
    </div>
  `
})
export class SizerComponent {
  @Input()  size!: number | string;
  @Output() sizeChange = new EventEmitter<number>();

  dec() { this.resize(-1); }
  inc() { this.resize(+1); }

  resize(delta: number) {
    this.size = Math.min(40, Math.max(8, +this.size + delta));
    this.sizeChange.emit(this.size);
  }
}

@Component({
  selector: 'example',
  templateUrl: './ex.component.html',
  styleUrls: ['./ex.component.scss']
})
export class ExampleComponent implements OnInit, AfterViewInit {
  myName = 'â';
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
