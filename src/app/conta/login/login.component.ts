import {  AfterViewInit,  Component,  ElementRef,  OnInit,  ViewChildren,} from '@angular/core';
import {   FormBuilder,  FormControlName,  FormGroup,  Validators,} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CustomValidators } from 'ng2-validation';
import { ToastrService } from 'ngx-toastr';
import { FormBaseComponent } from 'src/app/base-components/form-base.component';

import { Usuario } from '../models/usuario';
import { ContaService } from '../services/conta.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls : ['./login.component.css']
})
export class LoginComponent extends FormBaseComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];
  errors = [];
  loginForm: FormGroup;
  usuario: Usuario;

  returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private contaService: ContaService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    super();
    this.validationMessages = {
      email: {
        required: 'Informe o e-mail',
        email: 'Email inválido',
      },
      password: {
        required: 'Informe a senha',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres',
      },
    };

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];

    super.configurarMensagensValidacaoBase(this.validationMessages);
  }
  ngAfterViewInit(): void {
    super.configurarValidacaoFormularioBase(this.formInputElements, this.loginForm);
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, CustomValidators.rangeLength([6, 15])],
      ],
    });
  }


  login() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.usuario = Object.assign({}, this.usuario, this.loginForm.value);

      this.contaService.login(this.usuario).subscribe(
        (sucesso) => {
          this.processarSucesso(sucesso);
        },
        (falha) => {
          this.processarFalha(falha);
        }
      );
    }
  }

  processarSucesso(response: any) {
    this.loginForm.reset();
    this.errors = [];

    this.contaService.LocalStorage.salvarDadosLocaisUsuario(response);

    let toast = this.toastr.success(
      'Login realizado com Sucesso!',
      'Bem vindo!!!'
    );
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.returnUrl
        ? this.router.navigate([this.returnUrl])
        : this.router.navigate(['/home']);
      });
    }
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }
}
