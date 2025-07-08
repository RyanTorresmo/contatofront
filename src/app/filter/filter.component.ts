import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  standalone: false,
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  @Output() filtroMudou = new EventEmitter<any>();

  filtros = {
    nome: '',
    telefone: '',
    email: '',
    categoria: '',
    favorito: null
  };

  aplicarFiltro(): void {
    this.filtroMudou.emit(this.filtros);
  }

  limparFiltro(): void {
    this.filtros = {
      nome: '',
      telefone: '',
      email: '',
      categoria: '',
      favorito: null
    };
    this.aplicarFiltro();
  }
}
