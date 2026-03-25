import { AfterViewInit, Component, Directive, ElementRef, HostListener, inject, Input, OnInit, Pipe, PipeTransform, QueryList, ViewChildren } from '@angular/core';
import { Subject } from 'rxjs';
import { IStudent, studentList } from './studentList';
import { CommonModule } from '@angular/common';
import { BravoButtonComponent } from 'src/app/lib';


@Pipe({
    standalone: true,
    name: 'rank'
})
export class RankPipe implements PipeTransform {
    transform(value: number): string {
        switch (true) {
            case (value<5): return "Yếu";
            case (value< 6.5):return "TB";
            case (value < 8):return "Khá";
            case (value<=10):return "Giỏi";
        }
        return 'KXL';
    } 
}


@Directive({
    standalone : true,
    selector: '[highlight-text]' 
})
export class HighlightText{
    private text = '';  
    @Input('text-search') 
    get textSearch() {
        return this.text;
    }
    set textSearch(pValue: string) {
        this.text = pValue;
        this.highlight();
    }
    
    constructor(private el: ElementRef) { 
    }
    
    private highlight() {
        const textSearch =this.textSearch;
        const content = this.el.nativeElement.textContent;
        if (!content) return;
        if (!textSearch) {
            this.el.nativeElement.innerHTML = content;
            return;
        };
        const regex = this.createRegex(textSearch);
        this.el.nativeElement.innerHTML = content.replace(
            regex,
            `<span style="background-color: yellow">$1</span>`
        )
    }

    private createRegex(text: string): RegExp {
        return new RegExp(`(${text})`, 'gi');
    }
}

@Directive({
    standalone: true,
    selector: "[highlight-row]"
})
export class HighlightRow implements AfterViewInit {
    color = '';
    @Input('highlight-row') score !: number;

    constructor(private el: ElementRef) {
    }

    ngAfterViewInit(): void {
        this.colorRow();
    }
    
    @HostListener('mouseenter') onMouseEnter() {
        this.el.nativeElement.style.backgroundColor = '#637fa3'
    }
    @HostListener("mouseleave") onMouseLeave() {
        this.el.nativeElement.style.backgroundColor = this.color;
    }

    private colorRow() {
        if (this.score < 5) this.color = '#ffb0b0';
        else if (this.score < 6.5) this.color = '#fff1a4';
        else if (this.score < 8) this.color = '#aed3fb';
        else this.color = '#bbffcb';

        this.el.nativeElement.style.backgroundColor = this.color;
    }
}


@Component({
    standalone : true,
    selector: 'student-table',
    templateUrl: './student-table.component.html',
    styleUrls: ["./student-table.components.scss"],
    imports: [CommonModule, RankPipe, HighlightRow, HighlightText, BravoButtonComponent]
})

export class StudentTableComponent {
    private _students = studentList;
    public get studentList(): IStudent[] {
        return this._students;
    }
    public set studentList(pStudents: IStudent[]) {
        this._students = pStudents;
    }

    onChange(event: Event) {
        const input = event.target as HTMLInputElement;
    }

    handleUpdate(pStudentId: string) {
        console.log(pStudentId)
    }

    handleDelete(pStudentId: string) {
        this.studentList = this._students.filter(s => s.id != pStudentId);
    }
}