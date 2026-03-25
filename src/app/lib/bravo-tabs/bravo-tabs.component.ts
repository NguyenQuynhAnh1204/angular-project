import { AfterViewInit, Component, ElementRef, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';

import { IIndicator, TDisplay, TSize } from './bravo-tabs.interface';
import { BravoTabPanelComponent } from './bravo-tab-panel';
import { CommonModule } from '@angular/common';



@Component({
    standalone: true,
    selector: 'bravo-tabs',
    templateUrl: './bravo-tabs.component.html',
    styleUrls: ["./bravo-tabs.component.scss"],
    imports: [CommonModule]

})

export class BravoTabsComponent implements AfterViewInit {

    private _tabPanelList: BravoTabPanelComponent[] = [];
    public get tabPanelList() {
        return this._tabPanelList;
    }
    public set tabPanelList(pTab) {
        this._tabPanelList = pTab;
    }

    private _activeTab = 1;
    @Input("defaultActiveTab")
    public get activeTab() {
        return this._activeTab;
    } 
    public set activeTab(pTab) {
        this._activeTab = pTab
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

    // @Input() mode : 'top' | "bottom" | 'left' | 'right' = 'top';

    private _indicator: IIndicator = {size: 'half', align: 'left'};
    /**
     * @description {size?: string, align?: left, right, center}
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
    
    private _tabTitleRef!: ElementRef<any>
    @ViewChild("tabTitle")
    public get tabTitleRef() {
        return this._tabTitleRef;
    }
    public set tabTitleRef(pTitle: any) {
        this._tabTitleRef = pTitle;
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
        this._handleTitleView();
       this.handleChangeTab(this.activeTab);
    }

    public addTabPanel(pTab: BravoTabPanelComponent) {
        this.tabPanelList = [...this.tabPanelList, pTab];
    }

    public handleChangeTab(pTabIndex: number) {
        if(this.tabPanelList[pTabIndex].disabled) return;
        this.activeTab = pTabIndex;
        this._handleSetIndicator(pTabIndex);
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

    private _handleTitleView() {
        this._handelDisplay();
        this._handleSize()
    }
    private _handelDisplay() {
        const titleEl = this.tabTitleRef.nativeElement;
        if(this.display == 'left') {
            titleEl.style.justifyContent = 'flex-start'
        } else if(this.display == 'right') {
            titleEl.style.justifyContent = 'flex-end'
        } else if(this.display == 'center') {
            titleEl.style.justifyContent = 'center'
        }

    }
    private _handleSize() {
        const tabEl = this.tabRef;
        tabEl.forEach((tab) => {
            if(this.size == 'small') {
                tab.nativeElement.style.fontSize = '1.4rem';
            }
            if(this.size == 'large') {
                tab.nativeElement.style.fontSize = '1.8rem';
            }
            if(this.size == 'medium') {
                tab.nativeElement.style.fontSize = '1.6rem';
            }
        })
    }
   
}


