import { AfterViewInit, Component, Directive, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { IEmployee } from '../../employee';




@Component({
    selector: 'avatar',
    templateUrl: './employee-avt.component.html',
    styleUrls: ["./employee-avt.component.scss"]

})
export class EmployeeAvatarComponent implements OnInit, AfterViewInit {
    private _avatar!: string;
    protected isImg!: boolean;
    get avatar(): string {
        return this._avatar;
    }
    set avatar(value: string) {
        this._avatar = value;
    }
    
    private _employee!: IEmployee;
    @Input('avatar')
    set employee(employee: IEmployee) {
        this._employee = employee;
    }
    get employee(): IEmployee {
        return this._employee;
    }
    
    constructor() { 
    }
    
    ngOnInit() {
    }
    
    ngAfterViewInit() { 
        setTimeout(() => {
            this.getAvatar();
        });
    }
    
    private getAvatar() {
        if(!this.employee.avatar) {
            this.isImg = false
            this.avatar = BravoAvatarViewer.generateAvatar(this.employee.name);
            return;
        }
        this.isImg = true;
        this.avatar = this.employee.avatar as string;
    }
}



export class BravoAvatarViewer {
    public static generateAvatar(pFullName: string, pOptions?: Partial<typeof DefaultOptionAvatar>) {
        const option = {
            ...DefaultOptionAvatar,
            ...pOptions
        }

        let shortName = pFullName;

        const initials = shortName
                .match(/(\b\S)?/g) // lấy những ký tự đầu của một từ -không phải khoảng trắng
                ?.join('')         
                .match(/(^\S|\S$)?/g) // lấy những ký tự đầu và cuối - không phải khoảng trắng
                ?.join('')
                .toUpperCase() || '';
            
        const words = shortName.trim().split(/\s+/)

        if (words.length === 1) {
            shortName = shortName.substring(0,2).toUpperCase();
        } else if (initials.length >= 2) {
            shortName = initials;
        } else {
            shortName = option.userName.substring(0,2).toUpperCase();
        }

        if (shortName.length < 2) shortName = option.userName.substring(0,2).toUpperCase();

        return shortName;
        
        // const backColor = option.backColor ? option.backColor : 'blue';
        
        // const canvas = document.createElement("canvas");
        // const context = canvas.getContext("2d");


        // canvas.width = option.width;
        // canvas.height = option.height;

        // context.fillStyle = backColor;

    }

}


const DefaultOptionAvatar = {
    userName: '',
    width: 200,
    height: 200,
    foregroundColor: '#ffffff',
    isCycle: false,
    font: `7rem "Roboto", sans-serif`,
    backColor: '',
    marginTop: 2,
};
