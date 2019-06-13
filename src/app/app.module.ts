import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './components/root/app.component';
import { AuthService, TasksService } from './core/services';
import { AppRoutingModule } from './app-routing.module';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    CookieService,
    AuthService,
    TasksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
