import { style } from '@angular/animations';
import { AfterViewInit, Component, ContentChild, ElementRef, HostBinding, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
    selector: 'bravo-button',
    templateUrl: './bravo-button.component.html',
    styleUrls: ["./bravo-button.component.scss"],
})

export class BravoButtonComponent implements OnInit, AfterViewInit {
    private _loading = false;
    
    @Input() type: 'default' | 'primary' | 'dashed' | 'link' | 'text' = 'default';
    @Input() variant!: 'solid' | 'outlined' | 'dashed' | 'filled' | 'text' | 'link';
    @Input() shape!: 'round' | 'circle';
    @Input() color!:string;
    @Input() size!:string;
    @Input() icon!: string;
    @Input() iconPlacement: 'start' | 'end' = 'start';

    @Input() danger!: boolean;
    @Input() block!: boolean;
    @Input() disable = false;
    @Input() loadingTime = 0;
    @Input()
    get loading() {
        return this._loading;
    }
    set loading(pLoad: boolean) {
        this._loading = pLoad;
    }

    constructor(private elementRef: ElementRef<any>) { }

    ngOnInit() { 
    }

    ngAfterViewInit(): void {
        this.handleLoadTimer();
    }

    @HostBinding('style.width') get btnBlock() {
        if(!this.block) return;
        return '100%';
    }

    @HostBinding('style.--btn-size') 
    private get fontSize() {
        if (this.size == 'medium') return '12px'; 
        else if (this.size == "large") return "20px";
        else if (this.size == 'small') return '10px';
        else if (!this.size) return "16px";
        return this.size;
    };

    @HostBinding("style.--btn-color")
    get btnColor() {
        if(this.color == "error") return "#ff4d4f";
        if(this.color == 'warning') return "#fff201";
        if(this.color == 'success') return '#74ff4d';
        if(this.color == 'information') return '#5f4dff';
        return this.color;
    }

    @HostBinding("style.--btn-danger") 
    get btnDanger() {
        if(!this.danger) return "";
        return '#ff4d4f';
    }


    @HostBinding('style.--btn-border') 
    get btnBorder() {
        if(this.shape == 'round') return "99px";
        if(this.shape == "circle") return "100%";
        return '5px'
    }

    @HostBinding('style.flexDirection') 
    get btnReverse() {
        if(this.iconPlacement == 'start') return 'row';
        return 'row-reverse';
    }

    @HostBinding("class")
    get addType() {
        let classObj = {
            "disable": this.disable,
            "loading": this.loading,
        }
        if(!this.variant || this.danger) {
            return { 
                ...classObj,
                [`type-${this.type ?  this.type : 'default'}`]: true,
            }
        } else { 
            return {
                ...classObj,
                [`variant-${this.variant}`]: true
            }
        }
    }

    private handleLoadTimer() {
        if(this.loading && this.loadingTime > 0) {
            setTimeout(() => {
                this.loading = false;
            }, this.loadingTime)
        }
    }
    
    

}