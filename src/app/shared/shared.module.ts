import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatSortModule, MatTableModule } from '@angular/material';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
  ],
  exports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
  ]
})
export class SharedModule {
}
