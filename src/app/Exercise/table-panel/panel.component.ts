import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BravoPanelComponent } from 'src/app/lib';
import { IControlBase } from 'src/app/lib/bravo-control-base/bravo-control-base.type';



const CONFIG_LAYOUT: IControlBase[] = [
    {
        column: 3,
        row: 1, 
        label: "User name",
        style: {
            width: "200px",
            padding: "10 0",
            margin: "10 0"
        }
    }, {
      column: 2,
        row: 1, 
        label: "Email",
        style: {
            padding: "10 0",
            margin: "10 0"
        }  
    }, {
        column: 1,
        row: 1, 
        label: "Address",
        style: {
            padding: "10 0",
            margin: "10 0"
        }
    }, {
        column: 1,
        row: 2, 
        label: "Phone number",
        style: {
            padding: "10 10",
            margin: "10 0",
            backColor: "red",
            color: "yellow"
        }

    },
    {
        column: 2,
        row: 2, 
        label: "Passwords",
        style: {
            padding: "10 0",
            margin: "10 0"
        }
    }
]


@Component({
    standalone: true,
    selector: 'panel',
    templateUrl: './panel.component.html',
    styleUrls: ["./panel.component.scss"],
    imports: [CommonModule, BravoPanelComponent]
})

export class PanelComponent {
    public config = CONFIG_LAYOUT;
}