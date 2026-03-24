import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
    standalone: true,
    selector: 'dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ["./dynamic-form.component.scss"],
    imports: [FormsModule, CommonModule, ReactiveFormsModule],
})

export class DynamicFormComponent {

    public form = this.fb.group({
        lessons: this.fb.array([])
    });

    constructor(private fb:FormBuilder) {}
  
    public get lessons(): FormArray<FormGroup> {
        return this.form.get('lessons') as FormArray<FormGroup>;
    }

    public addLesson() {
      const lessonForm = this.fb.group({
        titleName: ['', Validators.required],
        level: ['beginner', Validators.required]
      });
      this.lessons.push(lessonForm);
    }

    public deleteLesson(lessonIndex: number) {
      this.lessons.removeAt(lessonIndex);
    }
    

}