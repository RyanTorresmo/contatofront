import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../contato.service';
import { Contato } from '../contats';


@Component({
  selector: 'app-contactlist',
  templateUrl: './contactlist.component.html',
  standalone: false,
  styleUrls: ['./contactlist.component.css']
})
export class ContactlistComponent implements OnInit {
  contatos: Contato [] = [];
  contatoEditando: Contato | null = null;
  carregando = true;
  erroCarregamento = '';

  constructor(private contatoService: ContatoService) {}

  ngOnInit(): void {
    this.carregarContatos();
  }

  carregarContatos(filtros?: any): void {
    this.carregando = true;
    this.erroCarregamento = '';
    
    this.contatoService.getContatos(filtros).subscribe({
      next: (res) => {
        this.contatos = res;
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao carregar contatos', err);
        this.erroCarregamento = 'Falha ao carregar contatos. Tente novamente mais tarde.';
        this.carregando = false;
      }
    });
  }

  iniciarEdicao(contato: Contato): void {
    this.contatoEditando = {...contato};
  }

 salvarEdicao(): void {
    if (!this.contatoEditando) return;
    
    const contatoId = this.contatoEditando.id;
    
    this.contatoService.atualizarContato(this.contatoEditando).subscribe({
        next: (contatoAtualizado) => {
            const index = this.contatos.findIndex(c => c.id === contatoId);
            if (index !== -1) {
                this.contatos[index] = contatoAtualizado;
            }
            this.contatoEditando = null;
        },
        error: (err) => {
            console.error('Erro ao atualizar contato:', err);

        }
    });
}

  cancelarEdicao(): void {
    this.contatoEditando = null;
  }

  favoritar(contato: Contato): void {
    contato.favorito = !contato.favorito;
    this.contatoService.atualizarContato(contato).subscribe();
  }

  deletar(id?: number): void {
    if (id === undefined) {
      console.warn('ID indefinido — não é possível deletar o contato');
      return;
    }

    if (confirm('Deseja excluir?')) {
      this.contatoService.deletarContato(id).subscribe(() => {
        this.contatos = this.contatos.filter(c => c.id !== id);
      });
    }
  }
}