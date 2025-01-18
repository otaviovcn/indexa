import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ContainerComponent } from '../../componentes/container/container.component';
import { SeparadorComponent } from '../../componentes/separador/separador.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContatoService } from '../../services/contato.service';
import { MensagemErroComponent } from "../../componentes/mensagem-erro/mensagem-erro.component";

@Component({
  selector: 'app-formulario-contato',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ContainerComponent,
    SeparadorComponent,
    ReactiveFormsModule,
    MensagemErroComponent
],
  templateUrl: './formulario-contato.component.html',
  styleUrl: './formulario-contato.component.css'
})
export class FormularioContatoComponent implements OnInit {

  contatoForm!: FormGroup;

  constructor(
    private contatoService: ContatoService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.inicializarFormulário();
    this.carregarContato();
  }

  inicializarFormulário() {
    this.contatoForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      avatar: new FormControl('', Validators.required),
      telefone: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      aniversario: new FormControl(''),
      redes: new FormControl(''),
      observacoes: new FormControl('')
    })
  }

  obterControle(nome: string): FormControl {
    const control = this.contatoForm.get(nome) as FormControl;
    if(!control) {
      throw new Error(`Controle ${nome} não encontrado no formulário.`);
    } else {
      return control;
    }
  }

  protected id: boolean = false;

  carregarContato() {
    const id = this.activateRoute.snapshot.paramMap.get('id');
    if(id) {
      this.contatoService.buscarPorId(Number(id)).subscribe(contato => {
        this.contatoForm.patchValue(contato);
      });
      this.id = true;
    } else {
      this.id = false;
    }
  }

  salvarContato() {
    const novoContato = this.contatoForm.value;
    const id = this.activateRoute.snapshot.paramMap.get('id');
    novoContato.id =  id ? parseInt(id) : null;

    this.contatoService.editarOuSalvar(novoContato).subscribe(() => {
      this.contatoForm.reset();
      this.router.navigateByUrl('/lista-contatos');
    });
  }

  aoSelecionarArquivo(event: any) {
    const file: File = event.target.files[0];
    if(file) {
      this.lerArquivo(file);
    }
  }

  lerArquivo(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.contatoForm.get('avatar')?.setValue(reader.result);
    }
    reader.readAsDataURL(file);
  }
  
  cancelar() {
    this.contatoForm.reset();
    this.router.navigateByUrl('/lista-contatos');
  }

}
