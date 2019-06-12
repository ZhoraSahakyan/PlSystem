import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskDialogComponent } from './components/task-dialog/task-dialog.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    HomePageComponent,
    TasksComponent,
    TaskDialogComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ],
  entryComponents: [
    TaskDialogComponent
  ]
})
export class HomeModule { }
