import { Injectable } from '@angular/core';

import { Contato } from '../interfaces/IContato';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  constructor(private http:HttpClient) { }

  private readonly API = 'http://localhost:3000/contatos';

  public obterContatos(): Observable<Contato[]> {
    return this.http.get<Contato[]>(this.API);
  }

  public salvarContatos(contato: Contato): Observable<Contato> {
    return this.http.post<Contato>(this.API, contato);
  }

}
