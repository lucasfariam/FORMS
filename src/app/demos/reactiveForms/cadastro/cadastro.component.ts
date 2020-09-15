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
  formResult: string = ''

  constructor(private fb: FormBuilder) { }

  //abaixo campos que seram preenchido e enviados quando for submetido
  ngOnInit() {
    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', [Validators.required, Validators.email] ],
      senha: ['', Validators.required],
      senhaConfirmacao: ['', Validators.required]
    })
  }

  adicionarUsuario() {
    if (this.cadastroForm.dirty && this.cadastroForm.valid) {
      // abaixo ele traz o OBJ usuario preenchido com os dados do formulario!
      this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value)
      this.formResult = JSON.stringify(this.cadastroForm.value) // abaixo ele verifica se os campos foram preenchido e retorna o valor dele
    
    }
    else {
      this.formResult = "Não Enviado!!!"
    }
  }
}
