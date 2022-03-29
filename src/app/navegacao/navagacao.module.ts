import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { FooterCompoent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuLoginComponent } from './menu-login/menu-login.component';
import { AcessoNegadoComponent } from './acesso-negado/acesso-negado.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    MenuComponent,
    MenuLoginComponent,
    HomeComponent,
    FooterCompoent,
    NotFoundComponent,
    AcessoNegadoComponent
    //SppinnerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    NgxSpinnerModule
  ],
  exports: [
    MenuComponent,
    MenuLoginComponent,
    HomeComponent,
    FooterCompoent,
    NotFoundComponent,
    AcessoNegadoComponent,
    //SppinnerComponent
  ],
})
export class NavegacaoModule {}
