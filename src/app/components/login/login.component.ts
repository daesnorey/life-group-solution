import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingService } from 'src/app/services/loading.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private loadingService: LoadingService,
    public authService: AuthService,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
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
              duration: 10000
            });
          }
        }, (reason) => {
          this.matSnackBar.open(reason, 'Cerrar', {
            duration: 10000
          });
        })
        .catch((reason) => {
          this.matSnackBar.open(reason, 'Cerrar', {
            duration: 10000
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
