import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../../../core/services';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'title', 'desc', 'status', 'date', 'place', 'address'];
  public dataSource: any[];

  constructor(private taskService: TasksService) {
  }

  ngOnInit() {
    this.taskService.getTasks()
      .subscribe(res => {
        this.dataSource = res;
      });
  }

}
