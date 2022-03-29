export class LocalStorageUtils {

  user : string = "ti.user";
  token:string = "ti.token";

  //Método responsável por obter os dados do usuário salvo no local storage transformar e JSON.
  public obterUsuario() {
    return JSON.parse(localStorage.getItem(this.user));
  }

  //Método responsável por obter o token do usuário salvo no local storage.
  public obterTokenUsuario(): string {
    return localStorage.getItem(this.token);
  }

  //Método para salvar o token e os dados do usuário no local storage.
  public salvarDadosLocaisUsuario(response: any) {
    this.salvarTokenUsuario(response.accessToken);
    this.salvarUsuario(response.userToken);
  }

  //Método responsável por remover os dados do usuário do local storage.
  public limparDadosLocaisUsuario() {
    localStorage.removeItem(this.token);
    localStorage.removeItem(this.user);
  }


  //Método responsável por salvar o token do usuário no local storage
  public salvarTokenUsuario(token: string) {
    localStorage.setItem(this.token, token);
  }

  //Método responsável por salvar os dados do usuário no local storage
  public salvarUsuario(user: string) {
    localStorage.setItem(this.user, JSON.stringify(user));
  }
}
