import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private _username$ = new BehaviorSubject<string | null>(null);
  private _role$ = new BehaviorSubject<string | null>(null);

  readonly isLoggedIn$ = this._isLoggedIn$.asObservable();
  readonly username$ = this._username$.asObservable();
  readonly role$ = this._role$.asObservable();

  constructor() { }

  setIsLoggedIn(value: boolean): void {
    this._isLoggedIn$.next(value);
  }

  setUsername(value: string): void {
    this._username$.next(value);
  }

  setRole(value: string): void {
    this._role$.next(value);
  }
}
