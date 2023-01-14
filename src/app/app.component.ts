import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { AuthService } from 'src/services/auth.service';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLoggedIn: Observable<boolean>;
  username: Observable<string | null>;
  role: Observable<string | null>;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn$;
    this.username = this.authService.username$;
    this.role = this.authService.role$;
  }

  onLoginLogoutClick(): void {
    this.isLoggedIn
    .pipe(take(1))
    .subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        // logout flow
      } else {
        this.dialog.open(LoginDialogComponent, {
          minWidth: 640
        });
      }
    });
  }
}
