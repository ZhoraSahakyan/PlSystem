import { Component, OnInit, ViewChild } from '@angular/core';

import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { TasksService } from '../../../../core/services';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  public allTasks: any[];
  public displayedColumns: string[] = ['id', 'title', 'desc', 'status', 'date', 'place', 'address', 'remove'];
  public dataSource = new MatTableDataSource([]);
  public filterList: any[] = [
    {value: 'title', viewValue: 'Title'},
    {value: 'place', viewValue: 'Place name'},
    {value: 'address', viewValue: 'Address'}
  ];
  public selectValue: string = 'title';
  public statuses: any[] = [
    {value: 0, viewValue: 'Failed'},
    {value: 1, viewValue: 'Complete'},
    {value: 10, viewValue: 'Pending'}
  ];

  constructor(private taskService: TasksService,
              public dialog: MatDialog,
              private notifier: NotifierService) {
  }

  ngOnInit() {
    this.taskService.getTasks()
      .subscribe(res => {
        this.allTasks = res;
        this.matFilter(this.allTasks);

        for (let task of this.allTasks) {
          const taskDate = task.date.split('.');
          const currentMonth = new Date().getMonth();
          const currentDate = new Date().getDate() - 1;
          const currentYear = new Date().getFullYear();
          if (taskDate[0] === currentMonth.toString()
            && taskDate[1] === currentDate.toString()
            && taskDate[2] === currentYear.toString()
            && task.status === 10) {
            this.notifier.notify('info', 'For today you have one task - ' + task.title);
          }
        }
      });
  }

  /**
   *
   * @param arr - tasks list
   * @desc Makes tasks filterable
   */
  public matFilter(arr: any[]): void {
    this.dataSource = new MatTableDataSource(arr);
    this.dataSource.sort = this.sort;
  }

  /**
   *
   * @param value - text from search field
   * @desc will make a filtering tasks by word
   */
  public filter(value: any): void {
    const filterName = this.selectValue;
    const filteredTasks = this.allTasks.filter(item => item[filterName].toLowerCase().includes(value.trim().toLowerCase()));
    this.matFilter(filteredTasks);
  }

  /**
   * @desc open modal for adding or changing tasks
   */

  openDialog(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '40%',
      data: {
        title: 'Add New Task'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.allTasks.push(result);

        this.matFilter(this.allTasks);
        this.notifier.notify('success', 'Task successfully added!');
      }
    });
  }


  /**
   * @param element - task
   * @param i - index of task
   * @desc open modal for editing task by index
   */
  public changeTask(element: any, i: number): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '40%',
      data: {
        isEdit: true,
        title: `Edit ${element.title} Task`,
        el: element,
        index: i
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.allTasks[result.index] = result;
        this.matFilter(this.allTasks);
        this.notifier.notify('success', 'Task successfully edited!');
      }
    });
  }

  /**
   * @desc remove task by index
   * @param index - index of task
   */

  public removeTask(index: number) {
    this.notifier.notify('success', 'Task successfully removed!');
    this.allTasks.splice(index, 1);
    this.matFilter(this.allTasks);
  }

}
