import { Component, Inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {
  public isEdit: boolean = false;
  public title: string;
  public taskForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) {

    this.title = data.title;
    this.taskForm = this.formBuilder.group({
      title: [data.el ? data.el.title : '', Validators.required],
      desc: [data.el ? data.el.desc : '', Validators.required],
      date: [data.el ? data.el.date : '', Validators.required],
      place: [data.el ? data.el.place : '', Validators.required],
      address: [data.el ? data.el.address : '', Validators.required]
    });

    if (data.isEdit) {
      this.isEdit = true;
    }
  }

  /**
   * @desc closing the dialog
   */

  public closeDialog(): void {
    this.dialogRef.close();
  }

  /**
   * @desc adding or editing task
   */

  public addTask(): void {
    const data = {
      ...this.taskForm.getRawValue()
    };
    const currentDate = new Date().toISOString();

    if (data.date.toISOString() < currentDate) {
      data.status = 0;
    } else {
      data.status = 10;
    }

    data.date = data.date.toLocaleString();

    if (this.title.includes('Edit')) {
      data.isEdit = true;
      data.index = this.data.index;
    }

    this.dialogRef.close({...data});
  }

  /**
   * @desc reset form
   */

  public resetForm(): void {
    this.taskForm.reset();
  }

  ngOnInit(): void {
  }

}
