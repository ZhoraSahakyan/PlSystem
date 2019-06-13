import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private cookiService: CookieService,
              private router: Router) {
  }

  ngOnInit() {
  }

  public logout() {
    this.cookiService.deleteAll();
    this.router.navigateByUrl('login');
  }

}
