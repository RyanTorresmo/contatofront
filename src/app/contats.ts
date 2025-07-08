export interface Contato {
  id?: number;
  nome: string;
  sobrenome: string;
  email: string;
  telefone?: string;
  celular?: string;
  endereco?: string;
  cidade?: string;
  estado?: string;
  categoria?: string;
  favorito?: boolean;
}
