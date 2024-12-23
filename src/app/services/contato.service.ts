import { Injectable } from '@angular/core';

import { Contato } from '../interfaces/IContato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  private contatos: Contato[] = [
    { "id": 1, "nome": "Ana", "telefone": "29 278869420" },
    { "id": 2, "nome": "Ágata", "telefone": "38 128451235" },
    { "id": 3, "nome": "Bruno", "telefone": "95 695521583" },
    { "id": 4, "nome": "Beatriz", "telefone": "25 854986459" },
    { "id": 5, "nome": "Carlos", "telefone": "94 543197849" },
  ]

  constructor() {
    const contatosLocalStorage: string | null = localStorage.getItem('contatos');
    const contatos: Contato[] = contatosLocalStorage ? JSON.parse(contatosLocalStorage) : this.contatos;

    if (contatos === null) {
      localStorage.setItem('contatos', JSON.stringify(this.contatos));
      this.contatos = contatos;
    }
  }

  public obterContatos(): Contato[] {
    return this.contatos;
  }

}
