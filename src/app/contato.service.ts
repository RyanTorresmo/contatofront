import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contato } from './contats';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  private apiUrl = 'http://localhost:3000/contato';

  constructor(private http: HttpClient) {}

  getContatos(filtros?: any): Observable<Contato[]> {
    return this.http.get<Contato[]>(this.apiUrl, { params: filtros });
  }

  atualizarContato(contato: Contato): Observable<Contato> {
    return this.http.put<Contato>(`${this.apiUrl}/${contato.id}`, contato);
  }

  deletarContato(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}