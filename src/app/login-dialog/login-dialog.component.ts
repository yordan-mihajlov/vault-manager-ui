import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  showPassword = false;

  loginFormGroup: FormGroup;

  constructor(
    private loginService: LoginService,
    private storageService: StorageService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<LoginDialogComponent>,) { }

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
    this.dialogRef.close({ message: 'Successful login!' });
  }

  private handleLoginFailure(value: HttpErrorResponse): void {
    console.log(value);
    this.dialogRef.close({ message: 'Failed to login!' });
  }

  private generateForm(): FormGroup {
    const form: FormGroup = this.formBuilder.group({});

    form.addControl('username', new FormControl('', [Validators.required]));
    form.addControl('password', new FormControl('', [Validators.required]));

    return form;
  }
}
