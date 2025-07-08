import { Component, OnInit } from '@angular/core';
import { Contato } from '../contats';
import { ContatoService } from '../contato.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  novoUsuario: Contato = {
    nome: '',
    sobrenome: '',
    email: '',
    telefone: '',
    celular: '',
    endereco: '',
    cidade: '',
    estado: '',
    categoria: 'outros',
    favorito: false
  };

  modoEdicao = false;

  constructor(
    private contatoService: ContatoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.modoEdicao = true;
        this.contatoService.getContato(id).subscribe({
          next: (contato) => this.novoUsuario = contato,
          error: (err) => {
            console.error('Erro ao carregar contato', err);
            alert('Erro ao carregar contato');
          }
        });
      }
    });
  }

  cadastrarUsuario(): void {
    if (this.modoEdicao) {
      this.contatoService.atualizarContato(this.novoUsuario).subscribe({
        next: () => this.router.navigate(['/contactlist']),
        error: (err) => {
          console.error('Erro ao atualizar contato', err);
          alert('Erro ao atualizar contato');
        }
      });
    } else {
      this.contatoService.criarContato(this.novoUsuario).subscribe({
        next: () => this.router.navigate(['/contactlist']),
        error: (err) => {
          console.error('Erro ao criar contato', err);
          alert('Erro ao criar contato');
        }
      });
    }
  }
}
