export interface Usuario {
  id: string;
  nome : string;
  celular:string;
  tipo : TipoUsuario;
  email: string;
  password: string;
  confirmPassword: string;
}

export enum TipoUsuario{
  Administrador,
  Prefeitura,
  Contribuinte
}
