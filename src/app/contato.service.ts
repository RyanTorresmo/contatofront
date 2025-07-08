import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contato } from './contats';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  private apiUrl = 'http://localhost:8080/contatos';

  constructor(private http: HttpClient) {}

  getContatos(filtros?: any): Observable<Contato[]> {
    
    const params = filtros ? new HttpParams({ fromObject: filtros }) : {};
    return this.http.get<Contato[]>(this.apiUrl, { params });
  }

  getContato(id: number): Observable<Contato> {
    return this.http.get<Contato>(`${this.apiUrl}/${id}`);
  }

  criarContato(contato: Contato): Observable<Contato> {
    return this.http.post<Contato>(this.apiUrl, contato);
  }

  atualizarContato(contato: Contato): Observable<Contato> {
    return this.http.put<Contato>(`${this.apiUrl}/${contato.id}`, contato);
  }

  deletarContato(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}