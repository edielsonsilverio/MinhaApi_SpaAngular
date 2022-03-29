import {AfterViewInit,Component,ElementRef,OnInit,ViewChildren,} from '@angular/core';
import { FormBuilder,FormControl,FormControlName,FormGroup, Validators,} from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { ToastrService } from 'ngx-toastr';
import { fromEvent, merge, Observable } from 'rxjs';
import { FormBaseComponent } from 'src/app/base-components/form-base.component';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { Usuario } from '../models/usuario';
import { ContaService } from '../services/conta.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
})
export class CadastroComponent extends FormBaseComponent implements OnInit, AfterViewInit {
  //Captura as informações dos elementos.
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];

  errors: any[] = [];
  cadastroForm: FormGroup;
  usuario: Usuario;

  mudancasNaoSalvas: boolean;

  //Onde são feita a validação dos formulários.
  constructor(
    private fb: FormBuilder,
    private contaService: ContaService,
    private router: Router,
    private toastr : ToastrService
  ) {
    super();

    this.validationMessages = {
      nome: {
        require: 'Informe o nome',
        nome: 'Nome inváilido',
      },
      email: {
        require: 'Informe o e-mail',
        email: 'Email inváilido',
      },
      password: {
        require: 'Informe a senha',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres',
      },
      confirmPassword: {
        require: 'Informe a senha novamente',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres',
        equalTo: 'As senhas não conferem',
      },
    };

    super.configurarMensagensValidacaoBase(this.validationMessages);
  }

  //Executa antes de carregar a view
  ngOnInit(): void {
    //Cria variáveis para comparação dos valores das senhas.
    let senha = new FormControl('', [
      Validators.required,
      CustomValidators.rangeLength([6, 15]),
    ]);
    let senhaConfirm = new FormControl('', [
      Validators.required,
      CustomValidators.rangeLength([6, 15]),
      CustomValidators.equalTo(senha),
    ]);

    this.cadastroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nome: [''],
      tipo : [''],
      celular:[''],
      password: senha,
      confirmPassword: senhaConfirm,
    });
  }

  //Executa depois de carregar a view
  ngAfterViewInit(): void {
    super.configurarValidacaoFormularioBase(this.formInputElements, this.cadastroForm);
  }

  adicionarConta() {
    //Verifica se o componente foi validado e foi digitado algo
    if (this.cadastroForm.dirty && this.cadastroForm.valid) {
      this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value);

      this.contaService.registrarUsuario(this.usuario)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );

        this.mudancasNaoSalvas = false;
    }
  }

  processarSucesso(response: any) {
    this.cadastroForm.reset();
    this.errors = [];

    this.contaService.LocalStorage.salvarDadosLocaisUsuario(response);

    let toast = this.toastr.success('Registro realizado com Sucesso!', 'Bem vindo!!!');
    if(toast)
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/home']);
      });

  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

}
