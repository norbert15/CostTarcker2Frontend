import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { RouterNames } from 'src/app/shared/commons/enums';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  formGroup!: FormGroup;

  constructor(private authService: AuthenticationService, private alertService: AlertService, private router: Router) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.authService.login(this.formGroup.getRawValue()).subscribe(
        response => {
          this.alertService.success("Sikeres bejelentkezés!")
          localStorage.setItem("user", JSON.stringify(response))

          this.authService.getAuthenticatedUser().subscribe(
            response => {
              let data: any = response.data;
              data["token"] = JSON.parse(localStorage.getItem("user")!)['token'];
              localStorage.setItem("user", JSON.stringify(data));

              this.router.navigate([`${RouterNames.PROFILE}/${RouterNames.RECORDS}/${RouterNames.DASHBOARD}`])
            }
          );
        },
        error => {
          this.alertService.danger("A felhasználónév vagy jelszó helytelen!")
        }
      )
    }
  }

}
