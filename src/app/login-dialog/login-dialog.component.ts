import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserInfoResponse } from 'src/models/user-info-response.model';
import { AuthService } from 'src/services/auth.service';
import { LoginService } from 'src/services/login.service';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  isLoginForm: boolean = true;
  loginTitle = 'Log in to your profile';
  registerTitle = 'Create your profile';

  loginFormGroup: FormGroup;

  constructor(
    private loginService: LoginService,
    private storageService: StorageService,
    private authService: AuthService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginFormGroup = this.generateForm();
  }

  onLogin(): void {
    const username = this.loginFormGroup.controls['username'].value;
    const password = this.loginFormGroup.controls['password'].value;

    this.loginService.login(username, password).subscribe({
      next: (value: UserInfoResponse) => this.handleLoginSuccess(value),
      error: (value: HttpErrorResponse) => this.handleLoginFailure(value)
    });
  }

  private handleLoginSuccess(value: UserInfoResponse): void {
    console.log(value);

    /* Store user in the browser. */
    this.storageService.storeUser(value);

    /* Preserve user data in the application state. */
    this.authService.setIsLoggedIn(true);
    this.authService.setUsername(value.username);
    this.authService.setRoles(value.roles);

    /* Close dialog on success. */
    // this.dialog.close();
  }

  private handleLoginFailure(value: HttpErrorResponse): void {
    console.log(value);
    /* Show message for unsuccessful login. */
  }

  private generateForm(): FormGroup {
    const form: FormGroup = this.formBuilder.group({});

    form.addControl('username', new FormControl('', [Validators.required]));
    form.addControl('password', new FormControl('', [Validators.required]));

    return form;
  }
}
