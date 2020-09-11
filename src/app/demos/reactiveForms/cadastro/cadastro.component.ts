import { Usuario } from './models/usuario';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent implements OnInit {

  cadastroForm: FormGroup
  usuario: Usuario
   
  constructor( private fb: FormBuilder) { }

    //abaixo campos que seram preenchido e enviados quando for submetido
  ngOnInit() {
    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', Validators.required],
      senha: ['', Validators.required],
      senhaConfirmacao: ['', Validators.required]
    })
  }

  adicionarUsuario() {
    this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value)
    //acima ele traz o OBJ usuario preenchido com os dados do formulario!
  }
}
 