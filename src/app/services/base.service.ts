import { LocalStorageUtils } from './../utils/localstorage';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

export abstract class BaseService {

  public LocalStorage = new LocalStorageUtils();

  //Url global do servidor externo, está declarada no arquivo environments.ts .
  protected UrlServiceV1 = environment.apiUrlv1;

  //Método para configura o cabeçalho para o httpClient
  protected ObterHeaderJson() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  //Método para configura o cabeçalho para o httpClient enviando o token junto
  protected ObterAuthHeaderJson() {
    return {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.LocalStorage.obterTokenUsuario()}`
        })
    };
}

  //Método para extair o retorno de sucesso
  protected extractData(response: Response | any) {
    return response.data || {};
  }

  //Método para extair o erros encontrados do retorno do servidor
  protected serviceError(response: Response | any) {
    let customError: string[] = [];

    if (response instanceof HttpErrorResponse) {
      if (response.statusText === 'Unknown Error') {
        customError.push('Ocorreu um erro desconhecido');
        response.error.errors = customError;
      }
    }

    console.error(response);
    return throwError(response);
  }
}
