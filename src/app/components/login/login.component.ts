import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingService } from 'src/app/services/loading.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatTableDataSource } from '@angular/material';

interface User {
  username: string;
  password: string;
  type: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public dataSource: MatTableDataSource<User>;
  public displayedColumns = ['username', 'password', 'type', 'button'];

  constructor(
    private loadingService: LoadingService,
    private authService: AuthService,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    const tmpUsers = this.authService.usersDictionary;
    if (tmpUsers instanceof Promise) {
      tmpUsers
        .then(users => {
          this.dataSource = new MatTableDataSource(users);
        })
        .catch((reason) => {
          console.log(reason);
        });
    } else {
      this.dataSource = new MatTableDataSource(tmpUsers);
    }
  }

  public login() {
    if (this.formIsOk()) {
      this.loadingService.isLoading = true;
      this.loginForm.disable();
      this.authService
        .login(this.loginForm.value.username, this.loginForm.value.password)
        .then(success => {
          if (success) {
            this.router.navigate(['/']);
          } else {
            this.matSnackBar.open('Usuario y/o contraseña erroneos', 'Cerrar', {
              duration: 10000,
              horizontalPosition: 'end',
              verticalPosition: 'top'
            });
          }
        }, (reason) => {
          this.matSnackBar.open(reason, 'Cerrar', {
            duration: 10000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
        })
        .catch((reason) => {
          this.matSnackBar.open(reason, 'Cerrar', {
            duration: 10000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
        })
        .finally(() => {
          this.loginForm.enable();
          this.loadingService.isLoading = false;
        });
    }
  }

  /**
   * Validates form
   */
  private formIsOk(): boolean {
    this.loginForm.markAsDirty();
    this.loginForm.markAsTouched();
    return this.loginForm.valid;
  }

  public use(user: any) {
    this.loginForm.get('username').patchValue(user.username);
    this.loginForm.get('password').patchValue(user.password);
  }
}
