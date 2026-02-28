import { AfterViewInit, Component, ElementRef, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';

import { IIndicator, ITabsProps, TDisplay, TSize } from './tabs.interface';



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
    public set tabItem(pItem) {
        this._tabItem = pItem;
    }
    
    private _defaultActiveTab = 1;
    @Input("defaultActiveTab")
    public get defaultActiveKey() {
        return this._defaultActiveTab;
    } 
    public set defaultActiveKey(pTab) {
        this._defaultActiveTab = pTab
    }
    
    private _tabDisabled = [] as number[];
    @Input('tabDisabled')
    public get tabDisabled() {
        return this._tabDisabled;
    } 
    public set tabDisabled(pTab: number[]) {
        this._tabDisabled = pTab;
    }

    private _display: TDisplay = 'left';
    /**
     * @description  left, right, center
     */
    @Input("display")
    public get display() {
        return this._display;
    }
    public set display(pDisplay) {
        this._display = pDisplay;
    }

    private _icon!: string;
    @Input('icon')
    public get icon() {
        return this._icon;
    } 
    public set icon(pIcon) {
        this._icon = pIcon;
    }

    // @Input() mode : 'top' | "bottom" | 'left' | 'right' = 'top';

    private _indicator: IIndicator = {size: 'half', align: 'center'};
    /**
     * @description {size?: string, align: left, right, center}
     */
    @Input('indicator')
    public get indicator() {
        return this._indicator;
    }
    public set indicator(pIndicator) {
        this._indicator = pIndicator;
    }

    private _size: TSize = 'small';
    @Input('size')
    public get size() {
        return this._size;
    }
    public set size(pSize) {
        this._size = pSize;
    }
    
    private _tabList: ITabsProps[] = [];
    @Input('items') 
    public get tabList(): ITabsProps[] {
        return this._tabList;
    }
    public set tabList(value: ITabsProps[]) {
        this._tabList = value;
    }

    private _tabTitleRef!: ElementRef<any>
    @ViewChild("tabTitle")
    public get tabTitleRef() {
        return this._tabTitleRef;
    }
    public set tabTitleRef(pTitle: any) {
        this._tabTitleRef = pTitle;
    }

    private _contentRef!: ElementRef<any>
    @ViewChild("content")
    public get contentRef() {
        return this._contentRef;
    }
    public set contentRef(pContent: any) {
        this._contentRef = pContent;
    }

    private _indicatorRef!: ElementRef<any>;
    @ViewChild("indicator")
    public get indicatorRef() {
        return this._indicatorRef;
    }
    public set indicatorRef(pIndicator) {
        this._indicatorRef = pIndicator;
    }

    private _tabRef!: QueryList<ElementRef>
    @ViewChildren('tab')
    public get tabRef() {
        return this._tabRef;
    }
    public set tabRef(pTabItem) {
        this._tabRef = pTabItem;
    }

    public ngAfterViewInit(): void {
        this._handleDisplayTitle();
       this.handleChangeTab(this.defaultActiveKey);
    }

    public isTabDisable(pTabKey: number) {
        return this.tabDisabled.includes(pTabKey);
    }

    public handleChangeTab(pTabKey: number) {
        if(this.isTabDisable(pTabKey)) return;
        let index = this.tabList.findIndex(tab => tab.key === pTabKey);
        if (index == -1) return;
        if (index >= this.tabList.length) return;
        this.tabItem = this.tabList[index];
        this._handleView();
        this._handleSetIndicator(index);
    }
    
    
    private _handleView() {
        if(!this.tabItem) return;
        this.contentRef.nativeElement.innerHTML = this.tabItem.children;
    }
    
    private _handleSetIndicator(pTabIndex: number) {
        const tabEl = this.tabRef.get(pTabIndex)?.nativeElement;
        const indicatorEl = this.indicatorRef.nativeElement;
        let indicatorWidth;
        let indicatorLeft;
        if(this.indicator.size == 'half') {
            indicatorWidth = tabEl.offsetWidth / 2;
        } else if(this.indicator.size == 'full') {
            indicatorWidth = tabEl.offsetWidth;
        }
        if(this.indicator.align == 'center' ) {
            indicatorLeft = tabEl.offsetLeft + tabEl.offsetWidth /4 
        } else if (this.indicator.align == 'left') {
            indicatorLeft = tabEl.offsetLeft
        } else if (this.indicator.align == 'right') {
            indicatorLeft = tabEl.offsetLeft + tabEl.offsetWidth - indicatorWidth
        }
        indicatorEl.style.width = `${indicatorWidth}px`;
        indicatorEl.style.left = `${indicatorLeft}px`;
    }

    private _handleDisplayTitle() {
        const titleEl = this.tabTitleRef.nativeElement;
        if(this.display == 'left') {
            titleEl.style.justifyContent = 'flex-start'
        } else if(this.display == 'right') {
            titleEl.style.justifyContent = 'flex-end'
        } else if(this.display == 'center') {
            titleEl.style.justifyContent = 'center'
        }

        if(this.size == 'small') {
            titleEl.style.frontSize = '14px';
        }
    }
   
}


