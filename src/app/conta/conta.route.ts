import { ContaGuard } from './services/conta.guard';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ContaAppComponent } from './conta.app.component';


const contaRouterConfig: Routes = [
  {
    path: '', component: ContaAppComponent,
    children: [
      { path: 'cadastro', component: CadastroComponent,canActivate:[ContaGuard],canDeactivate:[ContaGuard] },
      { path: 'login', component: LoginComponent,canActivate: [ContaGuard] }
    ]
  }
];


@NgModule({
  imports: [
      RouterModule.forChild(contaRouterConfig)
  ],
  exports: [RouterModule]
})
export class ContaRoutingModule { }
