import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ContainerComponent } from '../../componentes/container/container.component';
import { CabecalhoComponent } from '../../componentes/cabecalho/cabecalho.component';
import { SeparadorComponent } from '../../componentes/separador/separador.component';
import { ContatoComponent } from '../../componentes/contato/contato.component';
import { Contato } from '../../interfaces/IContato';
import { ContatoService } from '../../services/contato.service';


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
  ],
  templateUrl: './lista-contatos.component.html',
  styleUrl: './lista-contatos.component.css'
})
export class ListaContatosComponent implements OnInit {
  alfabeto: string = "abcdefghijklmnopqrstuvxywz";
  contatos: Contato[] = [];
  filtroPorTexto: string = '';

  constructor(private contatoService: ContatoService) {}
  
  ngOnInit(): void {
    this.contatos = this.contatoService.obterContatos();
    
  }

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
