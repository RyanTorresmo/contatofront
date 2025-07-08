import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../contato.service';
import { Contato } from '../contats';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  novoUsuario: Contato = {
    id: 0,
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

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.modoEdicao = true;
        const id = +params['id'];
        
        this.contatoService.getContato(id).subscribe({
          next: (contato: Contato) => {
            this.novoUsuario = contato;
          },
          error: (err: any) => {
            console.error('Erro ao carregar contato:', err);
            alert('Erro ao carregar contato para edição');
          }
        });
      }
    });
  }

  cadastrarUsuario() {
    if (this.modoEdicao) {
      
      this.contatoService.atualizarContato(this.novoUsuario).subscribe({
        next: () => {
          this.router.navigate(['/contactlist']);
        },
        error: (err) => {
          console.error('Erro ao atualizar contato:', err);
          alert('Erro ao atualizar contato');
        }
      });
    } else {
      
      this.contatoService.criarContato(this.novoUsuario).subscribe({
        next: () => {
          this.router.navigate(['/contactlist']);
        },
        error: (err: any) => {
          console.error('Erro ao criar contato:', err);
          alert('Erro ao criar novo contato');
        }
      });
    }
  }
}