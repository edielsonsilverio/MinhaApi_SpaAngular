import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DetalhesComponent } from "./detalhes/detalhes.component";
import { EditarComponent } from "./editar/editar.component";
import { ExcluirComponent } from "./excluir/excluir.component";
import { ListaComponent } from "./lista/lista.component";
import { NovoComponent } from "./novo/novo.component";
import { ProdutoAppComponent } from "./produto.app.component";

import { ProdutoGuard } from "./services/produto.guard";
import { ProdutoResolve } from "./services/produto.resolve";

const produtoRouterConfig: Routes = [
  {
      path: '', component: ProdutoAppComponent,
      children: [
          { path: 'listar-todos', component: ListaComponent },
          {
              path: 'adicionar-novo', component: NovoComponent,
              canDeactivate: [ProdutoGuard],
              canActivate: [ProdutoGuard],
              data: [{ claim: { nome: 'Produto', valor: 'Adicionar' } }],
          },
          {
              path: 'editar/:id', component: EditarComponent,
              canActivate: [ProdutoGuard],
              data: [{ claim: { nome: 'Produto', valor: 'Atualizar' } }],
              resolve: {
                  produto: ProdutoResolve
              }
          },
          {
              path: 'detalhes/:id', component: DetalhesComponent,
              resolve: {
                  produto: ProdutoResolve
              }
          },
          {
              path: 'excluir/:id', component: ExcluirComponent,
              canActivate: [ProdutoGuard],
              data: [{ claim: { nome: 'Produto', valor: 'Excluir' } }],
              resolve: {
                  produto: ProdutoResolve
              }
          },
      ]
  }
];

@NgModule({
  imports:[
     RouterModule.forChild(produtoRouterConfig)
  ],
  exports:[
    RouterModule
  ]
})

export class ProdutoRoutingModule { }
