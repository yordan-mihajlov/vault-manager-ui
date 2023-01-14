import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { AuthService } from 'src/services/auth.service';
import { StorageService } from 'src/services/storage.service';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLoggedIn: Observable<boolean>;
  username: Observable<string | undefined>;
  roles: Observable<Array<string | undefined> | undefined>;

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadStoredUser();

    this.isLoggedIn = this.authService.isLoggedIn$;
    this.username = this.authService.username$;
    this.roles = this.authService.roles$;
  }

  onLoginLogoutClick(): void {
    this.isLoggedIn
    .pipe(take(1))
    .subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        // logout flow
      } else {
        const dialogRef = this.dialog.open(LoginDialogComponent, {
          minWidth: 640
        });

        dialogRef.afterClosed().subscribe(({ message }) => {
          this.snackbar.open(message, undefined, { duration: 3000 });
        });
      }
    });
  }

  private loadStoredUser(): void {
    const storedUser = this.storageService.getStoredUser();
    const storedIsLoggedIn = this.storageService.getStoredIsLoggedIn();

    if (storedIsLoggedIn) {
      this.authService.setIsLoggedIn(storedIsLoggedIn);
      this.authService.setUsername(storedUser?.username);
      this.authService.setRoles(storedUser?.roles);
    } else {
      this.authService.setIsLoggedIn(false);
      this.authService.setUsername(undefined);
      this.authService.setRoles([]);
    }

  }
}
