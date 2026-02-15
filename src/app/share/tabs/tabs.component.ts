import { AfterViewInit, Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';

export interface ITabsProps {
    key: number;
    label?: string;
    children?: string;
}


@Component({
    selector: 'br-custom-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ["./tabs.component.scss"]
})

export class TabsCustomComponent implements OnInit, AfterViewInit {
    tabIndex = 0;

    private _items: ITabsProps[] = [];
    private _item: ITabsProps = {} as ITabsProps;
    get item() {
        return this._item;
    }
    set item(value: ITabsProps) {
        this._item = value;
        this.handleView();
    }

    @Input() defaultActiveKey = 1;
    @Input() disabled!: boolean;
    @Input() centered!: boolean;
    @Input() icon!: string;
    @Input() mode : 'top' | "bottom" | 'left' | 'right' = 'top';

    @Input('items') 
    get items(): ITabsProps[] {
        return this._items;
    }
    set items(value: ITabsProps[]) {
        this._items = value;
    }

    @ViewChild("content") contentRef!: ElementRef<any>;

    constructor() { }

    ngOnInit() { }

    ngAfterViewInit(): void {
       this.handleChangeTab(this.defaultActiveKey);
      
    }

    handleChangeTab(pTab: number) {
        if(!pTab) return;
        this.tabIndex = pTab;
        const item = this._items.find(i => i.key == pTab);
        if(!item) return;
        this.item = item;
    }

    handleView() {
        if(!this.item) return;
        this.contentRef.nativeElement.innerHTML = this.item.children;
    }
}

