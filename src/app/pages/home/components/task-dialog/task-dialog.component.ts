import { Component, Inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {
  public title: string;
  public taskForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) {

    this.title = data.title;
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      descr: ['', Validators.required],
      date: ['', Validators.required],
      place: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public addTask(): void {
    const data = {
      ...this.taskForm.getRawValue()
    };
    const currentDate = new Date().toLocaleString();

    if (data.date.toLocaleString() < currentDate) {
      data['status'] = 0;
    } else {
      data['status'] = 10;
    }

    data.date = data.date.toLocaleString();

    this.dialogRef.close({...data});
  }

  ngOnInit(): void {
  }

}
