import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../contato.service';
import { Contato } from '../contats';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-contactlist',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './contactlist.component.html',
  styleUrls: ['./contactlist.component.css']
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

  carregarContatos(): void {
    this.carregando = true;
    this.erroCarregamento = '';

    this.contatoService.getContatos().subscribe({
      next: (res) => {
        this.contatos = res;
        this.carregando = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Erro ao carregar contatos', err);
        this.erroCarregamento = 'Falha ao carregar contatos.';
        this.carregando = false;
      }
    });
  }

  iniciarEdicao(contato: Contato): void {
    this.contatoEditando = { ...contato };
  }

  salvarEdicao(): void {
    if (!this.contatoEditando) return;
    this.operacaoEmAndamento = true;

    this.contatoService.atualizarContato(this.contatoEditando).subscribe({
      next: (atualizado) => {
        const i = this.contatos.findIndex(c => c.id === atualizado.id);
        if (i !== -1) this.contatos[i] = atualizado;
        this.contatoEditando = null;
        this.operacaoEmAndamento = false;
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao salvar contato.');
        this.operacaoEmAndamento = false;
      }
    });
  }

  cancelarEdicao(): void {
    this.contatoEditando = null;
  }

favoritar(contato: Contato): void {
    
    contato.favorito = !contato.favorito;
    
    this.contatoService.atualizarContato(contato)
      .subscribe({
        next: (resp) => {
          
          if (resp && resp.id) {
            const idx = this.contatos.findIndex(c => c.id === resp.id);
            if (idx > -1) {
              this.contatos[idx] = resp;
            }
          }
          
        },
        error: (err) => {
          
          contato.favorito = !contato.favorito;
          console.error('Erro ao favoritar contato:', err);
          alert('Não foi possível favoritar o contato.');
        }
      });
  }



  deletar(id?: number): void {
    if (!id) return;
    if (!confirm('Excluir contato?')) return;

    this.operacaoEmAndamento = true;
    this.contatoService.deletarContato(id).subscribe({
      next: () => {
        this.contatos = this.contatos.filter(c => c.id !== id);
        this.operacaoEmAndamento = false;
      },
      error: (err) => {
        console.error('Erro ao deletar:', err);
        this.operacaoEmAndamento = false;
        alert('Erro ao deletar contato.');
      }
    });
  }

  navegarParaNovoContato(): void {
    this.router.navigate(['/form']);
  }
}
