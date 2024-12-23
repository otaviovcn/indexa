import { Component } from '@angular/core';
import { ContainerComponent } from '../../componentes/container/container.component';
import { CabecalhoComponent } from '../../componentes/cabecalho/cabecalho.component';
import { SeparadorComponent } from '../../componentes/separador/separador.component';
import { FormsModule } from '@angular/forms';
import { ContatoComponent } from '../../componentes/contato/contato.component';

interface Contato {
  id: number;
  nome: string;
  telefone: string;
}

import agenda from '../../agenda.json';
import { CommonModule } from '@angular/common';
import { FormularioContatoComponent } from '../formulario-contato/formulario-contato.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lista-contatos',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    ContainerComponent,
    CabecalhoComponent,
    SeparadorComponent,
    ContatoComponent,
    FormularioContatoComponent
  ],
  templateUrl: './lista-contatos.component.html',
  styleUrl: './lista-contatos.component.css'
})
export class ListaContatosComponent {
  alfabeto: string = "abcdefghijklmnopqrstuvxywz";
  contatos: Contato[] = agenda;
  filtroPorTexto: string = '';

  private removerAcentos(texto: string): string {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  public filtrarContatosPorTexto(): Contato[] {
    if(!this.filtroPorTexto) {
      return this.contatos;
    }
    return this.contatos.filter(contato => this.removerAcentos(contato.nome).toLowerCase().includes(this.removerAcentos(this.filtroPorTexto.toLowerCase())));
  }

  public filtrarContatos(letra: string): Contato[] {
    return this.filtrarContatosPorTexto().filter(contato => contato.nome[0].toLowerCase() === letra);
  }

}
