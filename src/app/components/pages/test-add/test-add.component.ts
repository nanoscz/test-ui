import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-test-add',
  templateUrl: './test-add.component.html',
  styleUrls: ['./test-add.component.scss']
})
export class TestAddComponent implements OnInit {
  public answers = {
    text: '',
    point: 0,
    question_id: null
  };

  public questions = {
    query: '',
    multiple: false
  };

  form: FormGroup;

  constructor(public router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      type: ['normal', [Validators.required]],
      questionsForm: this.fb.array([])
    });
  }

  onSubmit() {
    console.log(this.form.value, this.form.valid);
  }

  addQuestion() {
    const questionsForm = <FormArray>this.form.controls['questionsForm'];
    const newGroup = this.fb.group({
      query: ['', [Validators.required]],
      number: [3, [Validators.required]],
      multiple: [false]
    });
    questionsForm.push(newGroup);
  }

  removeQuestion(index): void {
    const questionsForm = <FormArray>this.form.controls['questionsForm'];
    questionsForm.removeAt(index);
  }

  toBack() {
    this.router.navigate(['/dashboard/test']);
  }
}