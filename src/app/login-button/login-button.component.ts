import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { LoginModalComponent } from '../login-modal/login-modal.component';
import { UserService } from '../user.service'

export interface User {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.css'],
})
export class LoginButtonComponent implements OnInit {

  username: string;
  password: string;
  loggedIn: boolean = false;

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar,
     private userService: UserService) {}

  ngOnInit() {
    this.username = '';
    this.password = '';
  }

  openLogin(): void {
    const dialogRef = this.dialog.open(LoginModalComponent, {
      width: '250px',
      data: {
        username: this.username,
        password: this.password,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.username = result.username;
        this.password = result.password;
        this.onLogin();
      }
    });
  }

  onLogin(): void {
    this.userService.loginUser(this.username, this.password).subscribe(
      response => {
        this.loggedIn = true;
        this.snackBar.open(`Logged in as ${this.username}`, 'Dismiss', {
          duration: 2000
        });
      },
      error => {
        this.snackBar.open(`Incorrect Username / Password`, 'Dismiss', {
          duration: 2000
        });
      }
    )
  }

  logout(): void {
    this.userService.logoutUser()
    this.loggedIn = false;
    this.snackBar.open(`Logged Out`, 'Dismiss', {
      duration: 2000
    });
  }
}
