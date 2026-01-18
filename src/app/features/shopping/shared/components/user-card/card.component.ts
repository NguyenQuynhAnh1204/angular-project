import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewEncapsulation,
  Input,
} from '@angular/core';

import { User } from '../list-card/userList';

@Component({
  selector: 'user-item',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() public user!: User;

  readonly #elementRef = inject(ElementRef);

  public get hostElement() {
    return this.#elementRef.nativeElement as HTMLElement;
  }

  constructor() {}

  ngOnInit() {}

  onClick(id: number) {
    console.log(id);
  }
}
