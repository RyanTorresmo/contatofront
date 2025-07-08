import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../contato.service';
import { Contato } from '../contats';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http'; 

@Component({
  selector: 'app-contactlist',
  templateUrl: './contactlist.component.html',
  styleUrls: ['./contactlist.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class ContactlistComponent implements OnInit {
  contatos: Contato[] = [];
  contatoEditando: Contato | null = null;
  carregando = true;
  erroCarregamento = '';
  operacaoEmAndamento = false;

  constructor(
    private contatoService: ContatoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarContatos();
  }

  carregarContatos(filtros?: any): void {
    this.carregando = true;
    this.erroCarregamento = '';
    
    this.contatoService.getContatos(filtros).subscribe({
      next: (res: Contato[]) => {
        this.contatos = res;
        this.carregando = false;
      },
      error: (err: HttpErrorResponse) => { 
        console.error('Erro ao carregar contatos', err);
        this.erroCarregamento = 'Falha ao carregar contatos. Tente novamente mais tarde.';
        this.carregando = false;
      }
    });
  }

  navegarParaNovoContato(): void {
    this.router.navigate(['/form']);
  }

  iniciarEdicao(contato: Contato): void {
    this.contatoEditando = { ...contato };
  }

  salvarEdicao(): void {
    if (!this.contatoEditando || !this.contatoEditando.id) {
      console.error('Contato inválido para edição');
      return;
    }

    this.operacaoEmAndamento = true;
    
    this.contatoService.atualizarContato(this.contatoEditando).subscribe({
      next: (contatoAtualizado: Contato) => {
        const index = this.contatos.findIndex(c => c.id === contatoAtualizado.id);
        if (index !== -1) {
          this.contatos[index] = contatoAtualizado;
        }
        this.contatoEditando = null;
        this.operacaoEmAndamento = false;
      },
      error: (err: HttpErrorResponse) => { 
        console.error('Erro ao atualizar contato:', err);
        this.operacaoEmAndamento = false;
        alert('Erro ao atualizar contato. Por favor, tente novamente.');
      }
    });
  }

  cancelarEdicao(): void {
    this.contatoEditando = null;
  }

  favoritar(contato: Contato): void {
    const contatoAtualizado = { ...contato, favorito: !contato.favorito };
    this.contatoService.atualizarContato(contatoAtualizado).subscribe({
      next: (updated: Contato) => {
        const index = this.contatos.findIndex(c => c.id === updated.id);
        if (index !== -1) {
          this.contatos[index] = updated;
        }
      },
      error: (err: HttpErrorResponse) => { 
        console.error('Erro ao favoritar contato:', err);
        alert('Erro ao favoritar contato. Por favor, tente novamente.');
      }
    });
  }

  deletar(id?: number): void {
    if (id === undefined) {
      console.warn('ID indefinido — não é possível deletar o contato');
      return;
    }

    if (confirm('Tem certeza que deseja excluir este contato?')) {
      this.operacaoEmAndamento = true;
      
      this.contatoService.deletarContato(id).subscribe({
        next: () => {
          this.contatos = this.contatos.filter(c => c.id !== id);
          this.operacaoEmAndamento = false;
        },
        error: (err: HttpErrorResponse) => { 
          console.error('Erro ao deletar contato:', err);
          this.operacaoEmAndamento = false;
          alert('Erro ao deletar contato. Por favor, tente novamente.');
        }
      });
    }
  }
}