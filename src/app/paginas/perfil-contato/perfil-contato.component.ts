import { Component } from '@angular/core';
import { ContainerComponent } from "../../componentes/container/container.component";
import { Contato } from '../../interfaces/IContato';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContatoService } from '../../services/contato.service';

@Component({
  selector: 'app-perfil-contato',
  standalone: true,
  imports: [
    ContainerComponent,
    RouterLink
  ],
  templateUrl: './perfil-contato.component.html',
  styleUrl: './perfil-contato.component.css'
})
export class PerfilContatoComponent {

  contato: Contato = {
    id: 0,
    nome: "dev",
    telefone: "8198888-7777",
    email: "teste@teste.com",
    aniversario: "01/01/2001",
    redes: "dev.com"
  }

  constructor(
    private activateRoute: ActivatedRoute,
    private contatoService: ContatoService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.activateRoute.snapshot.paramMap.get('id');
    if(id) {
      this.contatoService.buscarPorId(Number(id)).subscribe(contato => {
        this.contato = contato;
      });
    }    
  }

  excluir() {
    this.contatoService.excluirContato(this.contato.id).subscribe(() => {
      alert(`Contato ${this.contato.nome} excluído com sucesso!`);
      this.router.navigateByUrl('/lista-contatos');
    });
  }

  editar() {
    this.router.navigateByUrl(`/formulario/${this.contato.id}`);
  }

}