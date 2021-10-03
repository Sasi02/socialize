import { ActiveUserConfigService } from './../../../services/api/active-user-config.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private activeUserService: ActiveUserConfigService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.router.navigate(['/home']);
  }

}
