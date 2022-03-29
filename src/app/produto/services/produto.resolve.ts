
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";

import { Produto } from "../models/Produto";
import { ProdutoService } from './produto.services';


@Injectable()
export class ProdutoResolve implements Resolve<Produto>{

  constructor(private ProdutoService: ProdutoService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.ProdutoService.obterPorId(route.params['id']);
  }
}
