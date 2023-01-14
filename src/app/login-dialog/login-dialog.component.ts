import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  isLoginForm: boolean = true;
  loginTitle = 'Log in to your profile';
  registerTitle = 'Create your profile';

  constructor() { }

  ngOnInit(): void {
  }

}
