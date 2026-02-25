import { AfterViewInit, Component, ElementRef, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';

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

export class TabsCustomComponent implements AfterViewInit {
    //* tabItem
    private _tabItem: ITabsProps = {} as ITabsProps;
    public get tabItem() {
        return this._tabItem;
    }
    public set tabItem(value: ITabsProps) {
        this._tabItem = value;
        this.handleView();
    }
        
    @Input() defaultActiveKey = 1;
    @Input() disabled!: boolean;
    @Input() centered!: boolean;
    @Input() icon!: string;
    @Input() mode : 'top' | "bottom" | 'left' | 'right' = 'top';
    
    private _tabList: ITabsProps[] = [];
    @Input('tabList') 
    get tabList(): ITabsProps[] {
        return this._tabList;
    }
    set tabList(value: ITabsProps[]) {
        this._tabList = value;
    }

    private _tabRef!: QueryList<ElementRef>;
    @ViewChildren("tab")
    public get tabRef() {
        return this._tabRef;
    }
    public set tabRef(pElementRef) {
        this._tabRef = pElementRef;
    }

    private _contentRef!: ElementRef<any>;
    @ViewChild("content")
    public get contentRef() {
        return this._contentRef;
    }
    public set contentRef(pElementRef) {
        this._contentRef = pElementRef;
    }

    private _barRef!: ElementRef<any>;
    @ViewChild("bar")
    public get barRef() {
        return this._barRef;
    }
    public set barRef(pElementRef) {
        this._barRef = pElementRef;
    }

    public ngAfterViewInit(): void {
       this.handleOnChangeTab(this.defaultActiveKey);  
    }
    
    public handleOnChangeTab(pTab: number) {
        const index = this.tabList.findIndex(i => i.key === pTab);
        if(index === -1) return;
        this.tabItem = this.tabList[index];
        this.updateIndicator(index);
    }

    public handleView() {
        if(!this.tabItem) return;
        this.contentRef.nativeElement.innerHTML = this.tabItem.children;
    }

    public updateIndicator(pIndexTab: number) {
        const tabElement = this.tabRef.get(pIndexTab)?.nativeElement;
        const barElement = this.barRef.nativeElement;
        let width = tabElement.offsetWidth;
        let left = tabElement.offsetLeft;

        barElement.style.width = `${width}px`;
        barElement.style.left = `${left}px`;
    }
}


