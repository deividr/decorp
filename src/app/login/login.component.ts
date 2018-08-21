import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { User } from '../model/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private user: User = new User();
  private loginForm: FormGroup;
  private mensagem: string;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.authService.obterMensagem.subscribe(
      mensagem => this.mensagem = mensagem
    );
  }

  efetuarLogin() {
    this.user = this.prepararUser();

    this.authService.login(this.user)
      .subscribe(
        (res) => {
          console.log('Usuário logado! ');
          this.router.navigateByUrl('/');
        },
        (err) => {
          this.password.setValue('');
          console.log('Erro no login!');
        }
      );
  }

  prepararUser(): User {
    const formModel = this.loginForm.value;

    const user: User = {
      name: '',
      login: formModel.login,
      password: formModel.password
    };

    return user;
  }

  get login() {
    return this.loginForm.get('login');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
